from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Optional, Email, Regexp, ValidationError
from app.models import User


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
    email = StringField('email', validators=[DataRequired(), Email(message='Not a valid email address.'), user_exists])
    username = StringField('username', validators=[DataRequired(), username_exists])
    name = StringField('name')
    bio = StringField('bio')
    image_url = StringField('image_url', validators=[Optional(), Regexp('[^\\s]+(.*?)\\.(jpg|jpeg|png)$', message='Image URL must end in .png, .jpg, or .jpeg')])
    is_public = BooleanField('is_public')
    password = StringField('password', validators=[DataRequired()])
