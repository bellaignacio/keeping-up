from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text


demo = 1
aurora = 2
john = 3
jane = 4
tyler = 5

def seed_lists():
    list_1 = List(title='Coding Languages', caption='how long do you think this one will take me?', order='1,2,3,4,5', user_id=demo)
    list_2 = List(title='Become an Apple Master', caption='this one will take a while... $$$', order='6,7,8,9,10,11', user_id=demo)
    list_3 = List(title='Top SWE Applications', caption='hoping for the best! wish me luck.', order='12,13,14,15,16', user_id=demo)
    list_4 = List(title='Noods in Sawtelle', caption='couldn\'t choose one... so i\'m trying all of em', order='17,18,19,20,21', user_id=aurora)
    list_5 = List(title='Chick-fil-A\'s Breakfast Menu', caption='i WILL try everything', order='22,23,24,25,26,27,28', user_id=aurora)
    list_6 = List(title='Nature in Cali', caption='hmu if you want to come with', order='29,30,31,32', user_id=john)
    list_7 = List(title='Snowboarding Destinations', caption='gonna need a szn pass for the nest 5 years at least', order='33,34,35,36,37,38,39,40', user_id=john)
    list_8 = List(title='Random Hobbies', caption='been bored lately', order='41,42,43,44', user_id=tyler)
    list_9 = List(title='Movies to Watch', caption='netflix n chill, anyone?', order='45,46', user_id=tyler)
    list_10 = List(title='Shows to Watch', caption='popcorn\'s in hand, blankie on', order='47,48,49', user_id=tyler)
    list_11 = List(title='Major US Cities', caption='trying to get into the travel hype this year', order='50,51,52,53', user_id=tyler)

    db.session.add_all([
        list_1, list_2, list_3,
        list_4, list_5,
        list_6, list_7,
        list_8, list_9, list_10, list_11
    ])
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
