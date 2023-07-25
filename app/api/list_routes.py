from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, List
from app.forms import ListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)


@list_routes.route('/<int:list_id>')
@login_required
def list(list_id):
    """
    Query for a list by id and returns that list in a dictionary
    """
    list = List.query.get(list_id)
    return list.to_dict()


@list_routes.route('/public')
@login_required
def public_lists():
    """
    Query for all public lists and returns them in a list of list dictionaries
    """
    users = User.query.filter(User.is_public == True).all()
    public_ids = [user.id for user in users]
    lists = List.query.filter(List.user_id.in_(public_ids)).all()
    return {'lists': [l.to_dict() for l in lists]}


@list_routes.route('/followings')
@login_required
def following_lists():
    """
    Query for all lists of users that the current user follows and returns them in a list of list dictionaries
    """
    following_ids = [user.id for user in current_user.followings]
    lists = List.query.filter(List.user_id.in_(following_ids)).all()
    return {'lists': [l.to_dict() for l in lists]}


# @list_routes.route('/', methods=['POST'])
# @login_required
# def create_list():

# @list_routes.route('/<int:list_id>', methods=['PUT'])
# @login_required
# def update_list(list_id):

# @list_routes.route('/<int:list_id>', methods=['DELETE'])
# @login_required
# def delete_list(list_id):
