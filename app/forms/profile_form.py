from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Optional, Email, Regexp, ValidationError
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != current_user.id:
        raise ValidationError('Username is already in use.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    username = current_user.username
    user = User.query.filter(User.username == username).first()
    if not user or not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class ProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='Username is required.'), username_exists])
    name = StringField('name')
    bio = StringField('bio')
    image_url = StringField('image_url', validators=[Optional(), Regexp('[^\\s]+(.*?)\\.(jpg|jpeg|png)$', message='Image URL must end in .png, .jpg, or .jpeg')])
    is_public = BooleanField('is_public')
    password = StringField('password', validators=[DataRequired(message='Password is required.'), password_matches])
