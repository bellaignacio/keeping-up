from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Comment

comment_routes = Blueprint('comments', __name__)
