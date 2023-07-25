from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(user_id)
    return user.to_dict()


@user_routes.route('/public')
@login_required
def public_users():
    """
    Query for all public users and returns them in a list of user dictionaries
    """
    users = User.query.filter(User.is_public == True).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/followings')
@login_required
def following_users():
    """
    Query for all users that the current user follows and returns them in a list of user dictionaries
    """
    users = current_user.followings
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/followers')
@login_required
def follower_users():
    """
    Query for all users that follow the current user and returns them in a list of user dictionaries
    """
    users = current_user.followers
    return {'users': [user.to_dict() for user in users]}
