from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment_1 = Comment(user_id=2, list_id=2, comment='Apple products are so expensive though!')
    comment_2 = Comment(user_id=5, list_id=2, comment='i agree, but they connect so seamlessly with each other')
    comment_3 = Comment(user_id=1, list_id=2, comment='i\'ve already made progress, can\'t turn back now lol')
    comment_4 = Comment(user_id=3, list_id=3, comment='best of luck, im also trying to apply')
    comment_5 = Comment(user_id=1, list_id=4, comment='tsujita #1 always!')
    comment_6 = Comment(user_id=3, list_id=4, comment='but tatsu is open later so thats my go-to these days')
    comment_7 = Comment(user_id=4, list_id=5, comment='isnt fried chicken a bit unhealthy for breakfast')
    comment_8 = Comment(user_id=2, list_id=5, comment='you\'re, but its hard to resist yknow')
    comment_9 = Comment(user_id=2, list_id=5, comment='plus, you only live once xD')
    comment_10 = Comment(user_id=1, list_id=7, comment='yo, you board or ski?')
    comment_11 = Comment(user_id=3, list_id=7, comment='i started with skiing, but now i just snowboard')
    comment_12 = Comment(user_id=3, list_id=8, comment='pickleball is so easy to pick up')
    comment_13 = Comment(user_id=4, list_id=8, comment='you got this, keep yourself busy!')
    comment_14 = Comment(user_id=1, list_id=8, comment='let me come with!')
    comment_15 = Comment(user_id=2, list_id=9, comment='barbie > oppenheimer')
    comment_16 = Comment(user_id=4, list_id=9, comment='cillian is op')
    comment_17 = Comment(user_id=5, list_id=9, comment='margot and cillian are great at their craft')
    comment_18 = Comment(user_id=3, list_id=10, comment='gotta add narcos to the list!')
    comment_19 = Comment(user_id=1, list_id=10, comment='dont forget about yellowjackets too')
    comment_20 = Comment(user_id=2, list_id=10, comment='omitb was alright, season 1 is as good as itll get')
    comment_21 = Comment(user_id=3, list_id=10, comment='jack reacher with john k is amazing')
    comment_22 = Comment(user_id=5, list_id=10, comment='fr, ill watch anything with john krasinski')
    comment_23 = Comment(user_id=1, list_id=10, comment='yeah he was amazing in the office')
    comment_24 = Comment(user_id=4, list_id=11, comment='any progress here?')

    db.session.add_all([
        comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8,
        comment_9, comment_10, comment_11, comment_12, comment_13, comment_14, comment_15, comment_16,
        comment_17, comment_18, comment_19, comment_20, comment_21, comment_22, comment_23, comment_24
    ])
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
