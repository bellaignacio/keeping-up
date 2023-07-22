from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ListStyle(db.Model):
    __tablename__ = 'list_styles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    title_font = db.Column(db.String(255))
    title_size = db.Column(db.String(255))
    title_style = db.Column(db.String(255))
    title_weight = db.Column(db.String(255))
    title_color = db.Column(db.String(255))
    title_align = db.Column(db.String(255))
    li_font = db.Column(db.String(255))
    li_size = db.Column(db.String(255))
    li_style = db.Column(db.String(255))
    li_weight = db.Column(db.String(255))
    li_color = db.Column(db.String(255))
    li_marker = db.Column(db.String(255))
    li_completed_style = db.Column(db.String(255))
    li_completed_weight = db.Column(db.String(255))
    li_completed_color = db.Column(db.String(255))
    li_completed_decoration = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
