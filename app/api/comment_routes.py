from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Comment
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


# @comment_routes.route('/<int:list_id>', methods=['POST'])
# @login_required
# def create_comment(list_id):
#     """
#     Creates a comment
#     """


# @comment_routes.route('/<int:comment_id>', methods=['PUT'])
# @login_required
# def update_comment(comment_id):
#     """
#     Updates a comment
#     """


# @comment_routes.route('/<int:comment_id>', methods=['DELETE'])
# @login_required
# def delete_comment(comment_id):
#     """
#     Deletes a comment
#     """
