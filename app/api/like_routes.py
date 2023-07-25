from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Like
from app.api.auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)
