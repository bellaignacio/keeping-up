from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ListStyle(db.Model):
    __tablename__ = 'list_styles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    image_url = db.Column(db.String(255), nullable=False, default="https://i.ibb.co/18vQfvN/Nice-Png-torn-paper-texture-png-455986.png")
    title_font = db.Column(db.String(255), nullable=False, default="Arial")
    title_size = db.Column(db.String(255), nullable=False, default="14pt")
    title_style = db.Column(db.String(255), nullable=False, default="normal")
    title_weight = db.Column(db.String(255), nullable=False, default="bold")
    title_color = db.Column(db.String(255), nullable=False, default="black")
    title_align = db.Column(db.String(255), nullable=False, default="center")
    li_font = db.Column(db.String(255), nullable=False, default="Arial")
    li_size = db.Column(db.String(255), nullable=False, default="12pt")
    li_style = db.Column(db.String(255), nullable=False, default="normal")
    li_weight = db.Column(db.String(255), nullable=False, default="normal")
    li_color = db.Column(db.String(255), nullable=False, default="black")
    li_marker = db.Column(db.String(255), nullable=False, default="default")
    li_completed_style = db.Column(db.String(255), nullable=False, default="normal")
    li_completed_weight = db.Column(db.String(255), nullable=False, default="normal")
    li_completed_color = db.Column(db.String(255), nullable=False, default="black")
    li_completed_decoration = db.Column(db.String(255), nullable=False, default="solid line-through red 3px")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    list = db.relationship("List", back_populates="list_style")

    def to_dict(self):
        return {
            'id': self.id,
            'list_id': self.list_id,
            'image_url': self.image_url,
            'title_font': self.title_font,
            'title_size': self.title_size,
            'title_style': self.title_style,
            'title_weight': self.title_weight,
            'title_color': self.title_color,
            'title_align': self.title_align,
            'li_font': self.li_font,
            'li_size': self.li_size,
            'li_style': self.li_style,
            'li_weight': self.li_weight,
            'li_color': self.li_color,
            'li_marker': self.li_marker,
            'li_completed_style': self.li_completed_style,
            'li_completed_weight': self.li_completed_weight,
            'li_completed_color': self.li_completed_color,
            'li_completed_decoration': self.li_completed_decoration,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
