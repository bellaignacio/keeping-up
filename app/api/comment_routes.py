from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Comment
from app.forms import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:list_id>')
@login_required
def comments(list_id):
    """
    Query for all comments by list id and returns them in a list of comment dictionaries
    """
    comments = Comment.query.filter(Comment.list_id == list_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:list_id>', methods=['POST'])
@login_required
def create_comment(list_id):
    """
    Creates a comment
    """
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
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    """
    Updates a comment
    """
    comment = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    Deletes a comment
    """
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Delete successful.'}
