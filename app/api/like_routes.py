from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db, Like, List
from app.api.auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)


@like_routes.route('/<int:list_id>')
@login_required
def likes(list_id):
    """
    Query for all likes by list id and returns them in a list of like dictionaries
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    likes = Like.query.filter(Like.list_id == list_id).all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/<int:list_id>', methods=['POST'])
@login_required
def like_list(list_id):
    """
    Creates a like
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    existing_like = Like.query.filter((Like.user_id == current_user.id) & (Like.list_id == list_id)).first()
    if existing_like:
        return {'message': f"User already likes list {list_id}."}
    like = Like(
        user_id=current_user.id,
        list_id=list_id
    )
    db.session.add(like)
    db.session.commit()
    return list.to_dict()


@like_routes.route('/<int:list_id>', methods=['DELETE'])
@login_required
def unlike_list(list_id):
    """
    Deletes a like
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    existing_like = Like.query.filter((Like.user_id == current_user.id) & (Like.list_id == list_id)).first()
    if not existing_like:
        return {'message': f"User already does not like list {list_id}."}
    db.session.delete(existing_like)
    db.session.commit()
    return list.to_dict()
