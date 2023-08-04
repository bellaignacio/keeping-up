from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Comment, List
from app.forms import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:list_id>')
@login_required
def comments(list_id):
    """
    Query for all comments by list id and returns them in a list of comment dictionaries
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    comments = Comment.query.filter(Comment.list_id == list_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:list_id>', methods=['POST'])
@login_required
def create_comment(list_id):
    """
    Creates a comment
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            comment=form.data['comment'],
            user_id=current_user.id,
            list_id=list_id
        )
        db.session.add(comment)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    """
    Updates a comment
    """
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'errors': f"Comment {comment_id} does not exist."}, 400
    if comment.user_id != current_user.id:
        return {'errors': f"User is not the creator of comment {comment_id}."}, 401
    list = List.query.get(comment.list_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(comment)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'errors': f"Comment {comment_id} does not exist."}, 400
    list = List.query.get(comment.list_id)
    if list.user_id != current_user.id and comment.user_id != current_user.id:
        return {'errors': f"User is not the creator of comment {comment_id} nor of list {list.id}."}, 401
    db.session.delete(comment)
    db.session.commit()
    return list.to_dict()
