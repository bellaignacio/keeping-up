from app.models import db, List, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_lists(demo, aurora, john, jane, tyler, amelia, marc, sadie, lisa, caleb):
    list_1 = List(title='Coding Languages', caption='how long do you think this one will take me?', order='1,2,3,4,5', user_id=demo.id)
    list_2 = List(title='Become an Apple Master', caption='this one will take a while... $$$', order='6,7,8,9,10,11', user_id=demo.id)
    list_3 = List(title='Top SWE Applications', caption='hoping for the best! wish me luck.', order='12,13,14,15,16', user_id=demo.id)
    list_4 = List(title='Noods in Sawtelle', caption='couldn\'t choose one... so i\'m trying all of em', order='17,18,19,20,21', user_id=aurora.id)
    list_5 = List(title='Chick-fil-A\'s Breakfast Menu', caption='i WILL try everything', order='22,23,24,25,26,27,28', user_id=aurora.id)
    list_6 = List(title='Nature in Cali', caption='hmu if you want to come with', order='29,30,31,32', user_id=john.id)
    list_7 = List(title='Snowboarding Destinations', caption='gonna need a szn pass for the nest 5 years at least', order='33,34,35,36,37,38,39,40', user_id=john.id)
    list_8 = List(title='Random Hobbies', caption='been bored lately', order='41,42,43,44', user_id=tyler.id)
    list_9 = List(title='Movies to Watch', caption='netflix n chill, anyone?', order='45,46', user_id=tyler.id)
    list_10 = List(title='Shows to Watch', caption='popcorn\'s in hand, blankie on', order='47,48,49', user_id=tyler.id)
    list_11 = List(title='Major US Cities', caption='trying to get into the travel hype this year', order='50,51,52,53', user_id=tyler.id)
    list_12 = List(title='Flower Shop Essentials', caption='these are all the basics i need to get my business ready for wedding szn!', order='54,55,56,57,58,59,60', user_id=amelia.id)
    list_13 = List(title='National Parks Bucket List', caption='i love nature so these are my top places to visit, hopefully soon', order='61,62,63,64,65,66,67', user_id=tyler.id)
    list_14 = List(title='Michelin Starred Restaurants in Cali!!', caption='honestly too broke for these, but a girl can dream', order='68,69,70,71,72', user_id=aurora.id)

    # list_15 = List(title='', caption='', order='', user_id=aurora.id)
    # list_16 = List(title='', caption='', order='', user_id=demo.id)
    # list_17 = List(title='', caption='', order='', user_id=demo.id)
    # list_18 = List(title='', caption='', order='', user_id=demo.id)
    # list_19 = List(title='Europe - Summer 2024', caption='next summer boutta be lit!!!', order='', user_id=john.id)
    # list_20 = List(title='', caption='', order='', user_id=john.id)

    db.session.add_all([
        list_1, list_2, list_3, list_4, list_5,
        list_6, list_7, list_8, list_9, list_10,
        list_11, list_12, list_13, list_14
        # , list_15,
        # list_16, list_17, list_18, list_19, list_20
    ])
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
