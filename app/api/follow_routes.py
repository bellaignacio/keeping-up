from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Follow

follow_routes = Blueprint('follows', __name__)
