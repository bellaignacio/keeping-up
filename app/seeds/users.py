from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(email='demo@aa.io', username='demo_memo', name='Demo Acct', bio='test account for all', is_public=True, password='password')
    aurora = User(email='aurora@aa.io', username='aurororora', name='aurora i', image_url='https://i.ibb.co/12v3w7R/aurora.jpg', is_public=True, password='password')
    john = User(email='john@aa.io', username='johnnyrocket', bio='"just do it" -nike', password='password')
    jane = User(email='jane@aa.io', username='jane_doe_oe', name='Jane Doe', bio='hi there', image_url='https://i.ibb.co/Jxh5ZGL/jane.jpg', password='password')
    tyler = User(email='tyler@aa.io', username='tyler_asdfg', image_url='https://i.ibb.co/sJ2RP0G/tyler.jpg', is_public=True, password='password')

    db.session.add_all([
        demo, aurora, john, jane, tyler
    ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
