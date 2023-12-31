from app.models import db, ListStyle, environment, SCHEMA
from sqlalchemy.sql import text


def seed_list_styles():
    style_1 = ListStyle(list_id=1, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/coding.png', title_font='Times New Roman', title_size='18pt', title_style='italic', title_weight='bold', title_color='#00FF00', li_font='Courier New', li_color='#0000FF', li_completed_style='italic', li_completed_weight='bold', li_completed_color='#FFA500', li_completed_decoration='#00FF00')
    style_2 = ListStyle(list_id=2, title_align='left')
    style_3 = ListStyle(list_id=3, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/job.jpeg', title_font='Georgia', title_size='12pt', title_color='#0000FF', li_size='14pt')
    style_4 = ListStyle(list_id=4, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/ramen.jpeg', title_font='Times New Roman', title_align='left', li_font='Trebuchet MS', li_style='italic', li_color='#FF0000', li_completed_decoration='#0000FF')
    style_5 = ListStyle(list_id=5, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/cfa.jpeg', title_font='Georgia', title_color='#FF0000', li_font='Cambria', li_completed_weight='bold')
    style_6 = ListStyle(list_id=6, title_font='Comic Sans MS', title_weight='bold', li_completed_style='italic', li_completed_color='#FFA500')
    style_7 = ListStyle(list_id=7, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/snow.jpeg', title_size='24pt', title_style='italic', title_color='#FFFFFF', li_size='14pt', li_color='#800080', li_completed_decoration='#800080')
    style_8 = ListStyle(list_id=8, title_font='Cambria', title_style='italic', title_align='right', li_completed_decoration='#000000')
    style_9 = ListStyle(list_id=9, title_font='Courier New', title_style='36pt', li_font='Times New Roman', li_color='#00FF00', li_completed_style='italic', li_completed_color='#00FF00')
    style_10 = ListStyle(list_id=10, title_weight='bold', title_align='right', li_font='Comic Sans MS', li_completed_color='#800080')
    style_11 = ListStyle(list_id=11, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/city.jpeg', title_style='italic', title_align='left')
    style_12 = ListStyle(list_id=12, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/wedding.jpeg', title_font='Luminari', title_size='24pt', title_style='italic', title_align='left', li_font='Baskerville', li_size='18pt', li_completed_weight='bold', li_completed_decoration='#0000FF')
    style_13 = ListStyle(list_id=13, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/park.jpeg', title_font='Times New Roman', title_size='18pt', title_weight='bold', title_color='#155729', li_font='American Typewriter', li_size='16pt', li_style='italic', li_color='#008F1A', li_completed_weight='bold', li_completed_color='#000000', li_completed_decoration='#155729')
    style_14 = ListStyle(list_id=14, image_url='https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/michelin.jpeg', title_font='Didot', title_color='#507858', title_align='left', li_font='Georgia', li_color='#507858', li_completed_style='italic', li_completed_weight='bold', li_completed_decoration='#721287')

    # style_15 = ListStyle(list_id=15, image_url='', title_font='', title_size='', title_style='', title_weight='', title_color='', title_align='', li_font='', li_size='', li_style='', li_weight='', li_color='', li_completed_style='', li_completed_weight='', li_completed_color='', li_completed_decoration='')
    # style_16 = ListStyle(list_id=16, image_url='', title_font='', title_size='', title_style='', title_weight='', title_color='', title_align='', li_font='', li_size='', li_style='', li_weight='', li_color='', li_completed_style='', li_completed_weight='', li_completed_color='', li_completed_decoration='')
    # style_17 = ListStyle(list_id=17, image_url='', title_font='', title_size='', title_style='', title_weight='', title_color='', title_align='', li_font='', li_size='', li_style='', li_weight='', li_color='', li_completed_style='', li_completed_weight='', li_completed_color='', li_completed_decoration='')
    # style_18 = ListStyle(list_id=18, image_url='', title_font='', title_size='', title_style='', title_weight='', title_color='', title_align='', li_font='', li_size='', li_style='', li_weight='', li_color='', li_completed_style='', li_completed_weight='', li_completed_color='', li_completed_decoration='')
    # style_19 = ListStyle(list_id=19, image_url='', title_font='', title_size='', title_style='', title_weight='', title_color='', title_align='', li_font='', li_size='', li_style='', li_weight='', li_color='', li_completed_style='', li_completed_weight='', li_completed_color='', li_completed_decoration='')
    # style_20 = ListStyle(list_id=20, image_url='', title_font='', title_size='', title_style='', title_weight='', title_color='', title_align='', li_font='', li_size='', li_style='', li_weight='', li_color='', li_completed_style='', li_completed_weight='', li_completed_color='', li_completed_decoration='')

    db.session.add_all([
        style_1, style_2, style_3, style_4, style_5,
        style_6, style_7, style_8, style_9, style_10,
        style_11, style_12, style_13, style_14
        # , style_15,
        # style_16, style_17, style_18, style_19, style_20
    ])
    db.session.commit()


def undo_list_styles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.list_styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_styles"))

    db.session.commit()
