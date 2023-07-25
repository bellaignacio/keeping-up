from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import List

list_routes = Blueprint('lists', __name__)
