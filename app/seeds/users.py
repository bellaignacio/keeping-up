from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(email='demo@aa.io', username='demo_memo', name='Demo Acct', bio='test account for all', is_public=True, password='password')
    aurora = User(email='aurora@aa.io', username='aurororora', name='aurora i', image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/aurora.jpeg', is_public=True, password='password')
    john = User(email='john@aa.io', username='johnnyrocket', bio='"just do it" -nike', password='password')
    jane = User(email='jane@aa.io', username='jane_doe_oe', name='Jane Doe', bio='hi there', image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/jane.jpeg', password='password')
    tyler = User(email='tyler@aa.io', username='tyler_asdfg', image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/tyler.png', is_public=True, password='password')
    amelia = User(email='amelia@aa.io', username='i.am.elia', name='Amelia Familia', bio='just your friendly neighborhood florist', image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/flowers.jpeg', is_public=True, password='password')
    marc = User(email='marc@aa.io', username='marc_the_master', bio='my name is marc', is_public=True, password='password')
    sadie = User(email='sadie@aa.io', username='happie', name='Sadie', is_public=True, password='password')
    lisa = User(email='lisa@aa.io', username='not_lalalisa', name='Lalisa', image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/singer.jpeg', password='password')
    caleb = User(email='caleb@aa.io', username='bela.c.aleb', password='password')

    demo.followings = [aurora, john, tyler]
    aurora.followings = [demo, tyler]
    john.followings = [aurora, jane, tyler]
    jane.followings = [aurora]
    tyler.followings = [demo, aurora]

    db.session.add_all([
        demo, aurora, john, jane, tyler, amelia, marc, sadie, lisa, caleb
    ])
    db.session.commit()
    return (demo, aurora, john, jane, tyler, amelia, marc, sadie, lisa, caleb)


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
