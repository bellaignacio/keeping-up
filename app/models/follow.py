from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', foreign_keys=[user_id])
    following = db.relationship('User', foreign_keys=[following_id])

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'following_id': self.following_id,
            'user': self.user.to_dict(),
            'following': self.following.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
