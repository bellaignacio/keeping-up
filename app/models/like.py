from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="likes")
    list = db.relationship("List", back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
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
            'list_id': self.list_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
