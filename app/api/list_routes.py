from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, List, ListItem, ListStyle
from app.forms import ListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)


@list_routes.route('/<int:list_id>')
@login_required
def l(list_id):
    """
    Query for a list by id and returns that list in a dictionary
    """
    list = List.query.get(list_id)
    return list.to_dict()


@list_routes.route('/public')
@login_required
def public_lists():
    """
    Query for all public lists and returns them in a list of list dictionaries
    """
    users = User.query.filter(User.is_public == True).all()
    public_ids = [user.id for user in users]
    lists = List.query.filter(List.user_id.in_(public_ids)).all()
    return {'lists': [l.to_dict() for l in lists]}


@list_routes.route('/followings')
@login_required
def following_lists():
    """
    Query for all lists of users that the current user follows and returns them in a list of list dictionaries
    """
    following_ids = [user.id for user in current_user.followings]
    lists = List.query.filter(List.user_id.in_(following_ids)).all()
    return {'lists': [l.to_dict() for l in lists]}

# @list_routes.route('/test')
# @login_required
# def test():
#     last_li_id = (ListItem.query.order_by(ListItem.id.desc()).first()).id
#     return [last_li_id, last_li_id+1, last_li_id+1+7]

@list_routes.route('/', methods=['POST'])
@login_required
def create_list():
    """
    Creates a new list
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list_items = form.data['list_items'].split('\n')
        last_li_id = (ListItem.query.order_by(ListItem.id.desc()).first()).id

        new_list = List(
            title=form.data['title'],
            caption=form.data['caption'],
            order=",".join(str(n) for n in list(range(last_li_id+1, last_li_id+1+len(list_items)))),
            user_id=current_user.id
        )
        db.session.add(new_list)
        db.session.commit()

        for li in list_items:
            item = ListItem(
                list_id=new_list.id,
                description=li
            )
            db.session.add(item)

        list_style = ListStyle(
            list_id=new_list.id,
            image_url=form.data['image_url'],
            title_font=form.data['title_font'],
            title_size=form.data['title_size'],
            title_style=form.data['title_style'],
            title_weight=form.data['title_weight'],
            title_color=form.data['title_color'],
            title_align=form.data['title_align'],
            li_font=form.data['li_font'],
            li_size=form.data['li_size'],
            li_style=form.data['li_style'],
            li_weight=form.data['li_weight'],
            li_color=form.data['li_color'],
            li_marker=form.data['li_marker'],
            li_completed_style=form.data['li_completed_style'],
            li_completed_weight=form.data['li_completed_weight'],
            li_completed_color=form.data['li_completed_color'],
            li_completed_decoration=form.data['li_completed_decoration']
        )
        db.session.add(list_style)

        db.session.commit()
        return new_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @list_routes.route('/<int:list_id>', methods=['PUT'])
# @login_required
# def update_list(list_id):

# @list_routes.route('/<int:list_id>', methods=['DELETE'])
# @login_required
# def delete_list(list_id):
