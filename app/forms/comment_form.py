from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    comment = TextAreaField('comment', validators=[DataRequired(message='Comment is required.'), Length(max=255, message='Comment cannot be longer than %(max)d characters.')])
