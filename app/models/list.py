from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255), nullable=False)
    order = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="lists")
    list_style = db.relationship("ListStyle", back_populates="list", uselist=False, cascade="all, delete-orphan")
    list_items = db.relationship("ListItem", back_populates="list", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="list", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="list", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'caption': self.caption,
            'order': self.order,
            'user_id': self.user_id,
            'user': {
                'id': self.user.id,
                'email': self.user.email,
                'username': self.user.username,
                'name': self.user.name,
                'bio': self.user.bio,
                'image_url': self.user.image_url,
                'is_public': self.user.is_public,
            },
            'list_style': self.list_style.to_dict(),
            'list_items': [li.to_dict() for li in self.list_items],
            'comments': [c.to_dict() for c in self.comments],
            'likes': [lk.to_dict() for lk in self.likes],
            'total_likes': len(self.likes),
            'total_comments': len(self.comments),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
