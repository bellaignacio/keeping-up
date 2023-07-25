from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Follow
from app.api.auth_routes import validation_errors_to_error_messages

follow_routes = Blueprint('follows', __name__)
