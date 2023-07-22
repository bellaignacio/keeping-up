from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text


demo = 1
aurora = 2
john = 3
jane = 4
tyler = 5

def seed_follows():
    follow_1_2 = Follow(user_id=demo, following_id=aurora)
    follow_1_3 = Follow(user_id=demo, following_id=john)
    follow_1_5 = Follow(user_id=demo, following_id=tyler)
    follow_2_1 = Follow(user_id=aurora, following_id=demo)
    follow_2_5 = Follow(user_id=aurora, following_id=tyler)
    follow_3_2 = Follow(user_id=john, following_id=aurora)
    follow_3_4 = Follow(user_id=john, following_id=jane)
    follow_3_5 = Follow(user_id=john, following_id=tyler)
    follow_4_2 = Follow(user_id=jane, following_id=aurora)
    follow_5_1 = Follow(user_id=tyler, following_id=demo)
    follow_5_2 = Follow(user_id=tyler, following_id=aurora)

    db.session.add_all([
        follow_1_2, follow_1_3, follow_1_5,
        follow_2_1, follow_2_5,
        follow_3_2, follow_3_4, follow_3_5,
        follow_4_2,
        follow_5_1, follow_5_2
    ])
    db.session.commit()


def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
