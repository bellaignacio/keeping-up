from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Optional, Email, Regexp, Length, ValidationError
from app.models import User
from app.api.aws_helpers import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message='Email is required.'), Email(message='Not a valid email address.'), Length(max=255, message='Email cannot be longer than %(max)d characters.'), user_exists])
    username = StringField('username', validators=[DataRequired(message='Username is required.'), Regexp('^[a-zA-Z0-9._]+$', message='Username can only contain alphanumeric characters, underscores, and dots.'), Length(max=50, message='Username cannot be longer than %(max)d characters.'), username_exists])
    name = StringField('name', validators=[Optional(), Length(max=50, message='Name cannot be longer than %(max)d characters.')])
    bio = StringField('bio', validators=[Optional(), Length(max=150, message='Bio cannot be longer than %(max)d characters.')])
    image_url = FileField('image_url', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_public = BooleanField('is_public')
    password = StringField('password', validators=[DataRequired(message='Password is required.'), Length(min=8, message='Password must be at least %(min)d characters.')])
