from app.models import db, ListStyle, environment, SCHEMA
from sqlalchemy.sql import text


def seed_list_styles():
    style_1 = ListStyle(list_id=1, image_url='https://i.ibb.co/MB5XSWX/coding.png', title_font='Helvetica', title_size='16pt', title_style='italic', title_weight='bold', title_color='green', li_font='Courier', li_color='blue', li_marker='//', li_completed_style='italic', li_completed_weight='bold', li_completed_color='orange', li_completed_decoration='solid line-through green 3px')
    style_2 = ListStyle(list_id=2, title_align='start')
    style_3 = ListStyle(list_id=3, image_url='https://i.ibb.co/7WdqsW8/job.jpg', title_font='Helvetica', title_size='12pt', title_color='blue', li_size='14pt')
    style_4 = ListStyle(list_id=4, image_url='https://i.ibb.co/DCDT1vN/ramen.jpg', title_font='Times New Roman', title_align='start', li_font='Garamond', li_style='italic', li_color='red', li_marker='> ', li_completed_decoration='solid line-through blue 3px')
    style_5 = ListStyle(list_id=5, image_url='https://i.ibb.co/sm5BHVj/cfa.jpg', title_font='Georgia', title_color='red', li_font='Cambria', li_completed_weight='bold')
    style_6 = ListStyle(list_id=6, title_font='Comic Sans', title_weight='bold', li_completed_style='italic', li_completed_color='orange')
    style_7 = ListStyle(list_id=7, image_url='https://i.ibb.co/Ss4wWhx/snow.jpg', title_size='16pt', title_style='italic', title_color='white', li_size='14pt', li_color='purple', li_marker='<> ', li_completed_decoration='solid line-through purple 3px')
    style_8 = ListStyle(list_id=8, title_font='Geneva', title_style='italic', title_align='end', li_completed_decoration='solid line-through black 3px')
    style_9 = ListStyle(list_id=9, title_font='Courier', title_style='16pt', li_font='Times New Roman', li_color='green', li_marker='#', li_completed_style='italic', li_completed_color='green')
    style_10 = ListStyle(list_id=10, title_weight='bold', title_align='end', li_font='Segoe UI', li_completed_color='purple')
    style_11 = ListStyle(list_id=11, image_url='https://i.ibb.co/sbTcxLX/city.jpg', title_style='italic', title_align='start', li_marker='\{\} ')

    db.session.add_all([
        style_1, style_2, style_3, style_4, style_5, style_6,
        style_7, style_8, style_9, style_10, style_11
    ])
    db.session.commit()


def undo_list_styles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.list_styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_styles"))

    db.session.commit()
