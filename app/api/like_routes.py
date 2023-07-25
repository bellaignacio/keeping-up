from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Like

like_routes = Blueprint('likes', __name__)
