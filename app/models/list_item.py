from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ListItem(db.Model):
    __tablename__ = 'list_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    is_complete = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    list = db.relationship("List", back_populates="list_items")

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'list_id': self.list_id,
            'is_complete': self.is_complete,
            'created_at': self.created_at,
            'updated_at': self.udpated_at
        }
