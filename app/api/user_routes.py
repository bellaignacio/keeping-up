from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User
from app.forms import ProfileForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(user_id)
    if not user:
        return {'errors': f"User {user_id} does not exist."}, 400
    return user.to_dict()


@user_routes.route('/all')
@login_required
def all_users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/public')
@login_required
def public_users():
    """
    Query for all public users that the current user does not already follow and returns them in a list of user dictionaries
    """
    following_ids = [user.id for user in current_user.followings]
    users = User.query.filter((User.is_public == True) & (User.id.not_in([*following_ids, current_user.id]))).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/followings')
@login_required
def following_users():
    """
    Query for all users that the current user follows and returns them in a list of user dictionaries
    """
    return {'users': [user.to_dict() for user in current_user.followings]}


@user_routes.route('/followers')
@login_required
def follower_users():
    """
    Query for all users that follow the current user and returns them in a list of user dictionaries
    """
    return {'users': [user.to_dict() for user in current_user.followers]}


@user_routes.route('/<int:user_id>', methods=["PUT"])
@login_required
def update_user(user_id):
    """
    Updates a user
    """
    user = User.query.get(user_id)
    if not user:
        return {'errors': f"User {user_id} does not exist."}, 400
    if user.id != current_user.id:
        return {'errors': f"User can only edit their own profile."}, 401
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['image_url']:
            image_url = form.data['image_url']
            image_url.filename = get_unique_filename(image_url.filename)
            image_url_upload = upload_file_to_s3(image_url)

        user.username = form.data['username']
        user.name = form.data['name']
        user.bio = form.data['bio']
        if form.data['is_changed']:
            user.image_url = image_url_upload['url'] if form.data['image_url'] else "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png"
        user.is_public = form.data['is_public']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
