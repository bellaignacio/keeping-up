from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db, User
from app.api.auth_routes import validation_errors_to_error_messages

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def follow_user(user_id):
    """
    Creates a follow
    """
    user = User.query.get(user_id)
    if not user:
        return {'errors': f"User {user_id} does not exist."}, 400
    following_ids = [user.id for user in current_user.followings]
    existing_follow = User.query.filter(User.id.in_(following_ids)).first()
    if existing_follow:
        return {'message': f"User already follows user {user_id}."}
    current_user.followings.append(user)
    db.session.commit()
    return current_user.to_dict()


@follow_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unfollow_user(user_id):
    """
    Deletes a follow
    """
    user = User.query.get(user_id)
    if not user:
        return {'errors': f"User {user_id} does not exist."}, 400
    following_ids = [user.id for user in current_user.followings]
    existing_follow = User.query.filter(User.id.in_(following_ids)).first()
    if not existing_follow:
        return {'message': f"User already does not follow user {user_id}."}
    current_user.followings.remove(user)
    db.session.commit()
    return current_user.to_dict()


@follow_routes.route('/remove/<int:user_id>', methods=['DELETE'])
@login_required
def remove_follower(user_id):
    """
    Deletes a follower
    """
    user = User.query.get(user_id)
    if not user:
        return {'errors': f"User {user_id} does not exist."}, 400
    follower_ids = [user.id for user in current_user.followers]
    existing_follower = User.query.filter(User.id.in_(follower_ids)).first()
    if not existing_follower:
        return {'message': f"User {user_id} is already not a follower of user {current_user.id}."}
    current_user.followers.remove(user)
    db.session.commit()
    return current_user.to_dict()
