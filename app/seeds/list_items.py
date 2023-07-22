from app.models import db, ListItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_list_items():
    li_1 = ListItem(description='JavaScript', list_id=1, is_complete=True)
    li_2 = ListItem(description='HTML', list_id=1, is_complete=True)
    li_3 = ListItem(description='CSS', list_id=1)
    li_4 = ListItem(description='Python', list_id=1)
    li_5 = ListItem(description='C++', list_id=1)
    li_6 = ListItem(description='iPhone', list_id=2, is_complete=True)
    li_7 = ListItem(description='MacBook', list_id=2)
    li_8 = ListItem(description='AirPods', list_id=2, is_complete=True)
    li_9 = ListItem(description='iPad', list_id=2)
    li_10 = ListItem(description='AirTag', list_id=2, is_complete=True)
    li_11 = ListItem(description='HomePod', list_id=2)
    li_12 = ListItem(description='Meta', list_id=3)
    li_13 = ListItem(description='Apple', list_id=3)
    li_14 = ListItem(description='Microsoft', list_id=3)
    li_15 = ListItem(description='Google', list_id=3)
    li_16 = ListItem(description='Netflix', list_id=3)
    li_17 = ListItem(description='Tsujita LA', list_id=4, is_complete=True)
    li_18 = ListItem(description='Tsujita Annex', list_id=4, is_complete=True)
    li_19 = ListItem(description='Killer Noodle', list_id=4, is_complete=True)
    li_20 = ListItem(description='Tatsu Ramen', list_id=4)
    li_21 = ListItem(description='Marugame Udon', list_id=4, is_complete=True)
    li_22 = ListItem(description='Chicken Biscuit', list_id=5)
    li_23 = ListItem(description='Spicy Chicken Biscuit', list_id=5, is_complete=True)
    li_24 = ListItem(description='Chick-n Minis', list_id=5, is_complete=True)
    li_25 = ListItem(description='Egg White Grill', list_id=5)
    li_26 = ListItem(description='Hash Brown Scramble Burrito', list_id=5)
    li_27 = ListItem(description='Bacon Egg Cheese Biscuit', list_id=5)
    li_28 = ListItem(description='Sausage Egg Cheese Muffin', list_id=5, is_complete=True)
    li_29 = ListItem(description='Tree Watching @ Sequoia or Redwoods', list_id=6)
    li_30 = ListItem(description='Swimming @ Santa Monica Beach', list_id=6)
    li_31 = ListItem(description='Geyser Watching @ Yellowstone', list_id=6)
    li_32 = ListItem(description='Star Gazing @ Joshua Tree', list_id=6)
    li_33 = ListItem(description='Bear Mountain', list_id=7, is_complete=True)
    li_34 = ListItem(description='Mammoth Mountain', list_id=7)
    li_35 = ListItem(description='Whistler', list_id=7)
    li_36 = ListItem(description='Copper Mountain', list_id=7, is_complete=True)
    li_37 = ListItem(description='Jackson Hole', list_id=7)
    li_38 = ListItem(description='Mt. Hood', list_id=7)
    li_39 = ListItem(description='Palisades Tahoe', list_id=7)
    li_40 = ListItem(description='Brighton Resort', list_id=7, is_complete=True)
    li_41 = ListItem(description='Badminton', list_id=8)
    li_42 = ListItem(description='Pickleball', list_id=8)
    li_43 = ListItem(description='Pottery', list_id=8)
    li_44 = ListItem(description='Rug Making', list_id=8)
    li_45 = ListItem(description='Barbie', list_id=9)
    li_46 = ListItem(description='Oppenheimer', list_id=9, is_complete=True)
    li_47 = ListItem(description='The Summer I Turned Pretty', list_id=10)
    li_48 = ListItem(description='Only Murders in the Building', list_id=10, is_complete=True)
    li_49 = ListItem(description='Jack Reacher', list_id=10)
    li_50 = ListItem(description='Chicago', list_id=11, is_complete=True)
    li_51 = ListItem(description='New York City', list_id=11, is_complete=True)
    li_52 = ListItem(description='Hawaii', list_id=11)
    li_53 = ListItem(description='New Orleans', list_id=11)

    db.session.add_all([
        li_1, li_2, li_3, li_4, li_5, li_6, li_7, li_8, li_9, li_10,
        li_11, li_12, li_13, li_14, li_15, li_16, li_17, li_18, li_19, li_20,
        li_21, li_22, li_23, li_24, li_25, li_26, li_27, li_28, li_29, li_30,
        li_31, li_32, li_33, li_34, li_35, li_36, li_37, li_38, li_39, li_40,
        li_41, li_42, li_43, li_44, li_45, li_46, li_47, li_48, li_49, li_50,
        li_51, li_52, li_53
    ])
    db.session.commit()


def undo_list_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.list_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_items"))

    db.session.commit()
