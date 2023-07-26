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
    current_user.followings.remove(user)
    db.session.commit()
    return current_user.to_dict()


@follow_routes.route('/remove/<int:user_id>', methods=['DELETE'])
@login_required
def remove_follower(user_id):
    """
    Deletes a follow
    """
    user = User.query.get(user_id)
    current_user.followers.remove(user)
    db.session.commit()
    return current_user.to_dict()
