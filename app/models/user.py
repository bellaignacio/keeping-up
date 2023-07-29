from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("following_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
)

if environment == "production":
    follows.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    name = db.Column(db.String(255))
    bio = db.Column(db.String(255))
    image_url = db.Column(db.String(255), nullable=False, default="https://i.ibb.co/jTrn4Vc/default.png")
    is_public = db.Column(db.Boolean, nullable=False, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    followings = db.relationship(
        'User',
        secondary=follows,
        primaryjoin=(id == follows.c.user_id),
        secondaryjoin=(id == follows.c.following_id),
        backref='followers'
    )
    lists = db.relationship("List", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'name': self.name,
            'bio': self.bio,
            'image_url': self.image_url,
            'is_public': self.is_public,
            'followings': [{
                'id': f.id,
                'email': f.email,
                'username': f.username,
                'name': f.name,
                'bio': f.bio,
                'image_url': f.image_url,
                'is_public': f.is_public
            } for f in self.followings],
            'followers': [{
                'id': f.id,
                'email': f.email,
                'username': f.username,
                'name': f.name,
                'bio': f.bio,
                'image_url': f.image_url,
                'is_public': f.is_public
            } for f in self.followers],
            'lists': [l.to_dict() for l in self.lists],
            'total_lists': len(self.lists),
            'total_followings': len(self.followings),
            'total_followers': len(self.followers),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
