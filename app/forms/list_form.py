from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Optional, Regexp, Length, ValidationError


def list_item_length(form, field):
    list_items = field.data
    list_items_list = list_items.split("/n")
    for li in list_items_list:
        if len(li) > 255:
            raise ValidationError('List items cannot be longer than 255 characters.')


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Title is required.'), Length(max=255, message='Title cannot be longer than %(max)d characters.')])
    caption = StringField('caption', validators=[DataRequired(message='Caption is required.'), Length(max=255, message='Caption cannot be longer than %(max)d characters.')])
    list_items = TextAreaField('list_items', validators=[DataRequired(message='List is required.'), list_item_length])
    image_url = StringField('image_url', validators=[Optional(), Regexp('[^\\s]+(.*?)\\.(jpg|jpeg|png)$', message='Image URL must end in .png, .jpg, or .jpeg')])
    title_font = StringField('title_font')
    title_size = StringField('title_size')
    title_style = StringField('title_style')
    title_weight = StringField('title_weight')
    title_color = StringField('title_color')
    title_align = StringField('title_align')
    li_font = StringField('li_font')
    li_size = StringField('li_size')
    li_style = StringField('li_style')
    li_weight = StringField('li_weight')
    li_color = StringField('li_color')
    li_marker = StringField('li_marker')
    li_completed_style = StringField('li_completed_style')
    li_completed_weight = StringField('li_completed_weight')
    li_completed_color = StringField('li_completed_color')
    li_completed_decoration = StringField('li_completed_decoration')
