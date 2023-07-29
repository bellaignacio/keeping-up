from app.models import db, Like, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_likes(demo, aurora, john, jane, tyler):
    like_1 = Like(user_id=aurora.id, list_id=1)
    like_2 = Like(user_id=tyler.id, list_id=1)
    like_3 = Like(user_id=jane.id, list_id=1)
    like_4 = Like(user_id=demo.id, list_id=2)
    like_5 = Like(user_id=tyler.id, list_id=2)
    like_6 = Like(user_id=demo.id, list_id=4)
    like_7 = Like(user_id=john.id, list_id=4)
    like_8 = Like(user_id=jane.id, list_id=4)
    like_9 = Like(user_id=tyler.id, list_id=4)
    like_10 = Like(user_id=demo.id, list_id=5)
    like_11 = Like(user_id=john.id, list_id=5)
    like_12 = Like(user_id=demo.id, list_id=6)
    like_13 = Like(user_id=demo.id, list_id=7)
    like_14 = Like(user_id=demo.id, list_id=8)
    like_15 = Like(user_id=john.id, list_id=8)
    like_16 = Like(user_id=jane.id, list_id=8)
    like_17 = Like(user_id=tyler.id, list_id=8)
    like_18 = Like(user_id=demo.id, list_id=9)
    like_19 = Like(user_id=aurora.id, list_id=9)
    like_20 = Like(user_id=john.id, list_id=9)
    like_21 = Like(user_id=demo.id, list_id=10)
    like_22 = Like(user_id=aurora.id, list_id=10)

    db.session.add_all([
        like_1, like_2, like_3, like_4, like_5,
        like_6, like_7, like_8, like_9, like_10,
        like_11, like_12, like_13, like_14, like_15,
        like_16, like_17, like_18, like_19, like_20,
        like_21, like_22
    ])
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
