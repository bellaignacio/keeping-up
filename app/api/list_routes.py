from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, List, ListItem, ListStyle
from app.forms import ListForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3

list_routes = Blueprint('lists', __name__)


@list_routes.route('/<int:list_id>')
@login_required
def l(list_id):
    """
    Query for a list by id and returns that list in a dictionary
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    return list.to_dict()


@list_routes.route('/public')
@login_required
def public_lists():
    """
    Query for all lists of public users that the current user does not already follow and returns them in a list of list dictionaries
    """
    following_ids = [user.id for user in current_user.followings]
    users = User.query.filter((User.is_public == True) & (User.id.not_in([*following_ids, current_user.id]))).all()
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
            if li != '\r':
                item = ListItem(
                    list_id=new_list.id,
                    description=li
                )
                db.session.add(item)

        if form.data['image_url']:
            image_url = form.data['image_url']
            image_url.filename = get_unique_filename(image_url.filename)
            image_url_upload = upload_file_to_s3(image_url)

        list_style = ListStyle(
            list_id=new_list.id,
            image_url=image_url_upload['url'] if form.data['image_url'] else "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/torn-paper.png",
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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@list_routes.route('/<int:list_id>/items', methods=['POST'])
@login_required
def create_li(list_id):
    """
    Creates a new list item
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    if list.user_id != current_user.id:
        return {'errors': f"User is not the creator of list {list_id}."}, 401
    data = request.json
    if len(data['description']) > 255:
        return {'errors': ['List items cannot be longer than 255 characters.']}, 400
    if len(data['description']) < 1:
        return {'errors': ['List item descriptions are required.']}, 400
    item = ListItem(
        list_id=list_id,
        description=data['description']
    )
    db.session.add(item)
    db.session.commit()
    list.order = list.order + f",{item.id}"
    db.session.commit()
    return list.to_dict()


@list_routes.route('/<int:list_id>', methods=['PUT'])
@login_required
def update_list(list_id):
    """
    Updates a list
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    if list.user_id != current_user.id:
        return {'errors': f"User is not the creator of list {list_id}."}, 401
    list_style = ListStyle.query.filter(ListStyle.list_id == list_id).first()
    list_items = ListItem.query.filter(ListItem.list_id == list_id).all()
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['image_url']:
            image_url = form.data['image_url']
            image_url.filename = get_unique_filename(image_url.filename)
            image_url_upload = upload_file_to_s3(image_url)

        list.title = form.data['title']
        list.caption = form.data['caption']
        list_style.title_font = form.data['title_font']
        list_style.title_size = form.data['title_size']
        list_style.title_style = form.data['title_style']
        list_style.title_weight = form.data['title_weight']
        list_style.title_color = form.data['title_color']
        list_style.title_align = form.data['title_align']
        list_style.li_font = form.data['li_font']
        list_style.li_size = form.data['li_size']
        list_style.li_style = form.data['li_style']
        list_style.li_weight = form.data['li_weight']
        list_style.li_color = form.data['li_color']
        list_style.li_marker = form.data['li_marker']
        list_style.li_completed_style = form.data['li_completed_style']
        list_style.li_completed_weight = form.data['li_completed_weight']
        list_style.li_completed_color = form.data['li_completed_color']
        list_style.li_completed_decoration = form.data['li_completed_decoration']
        if form.data['is_changed']:
            list_style.image_url = image_url_upload['url'] if form.data['image_url'] else "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/torn-paper.png"
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@list_routes.route('/items/<int:li_id>', methods=['PUT'])
@login_required
def update_li(li_id):
    """
    Updates a list item
    """
    list_item = ListItem.query.get(li_id)
    if not list_item:
        return {'errors': f"List item {li_id} does not exist."}, 400
    list = List.query.get(list_item.list_id)
    if list.user_id != current_user.id:
        return {'errors': f"User is not the creator of list item {li_id}."}, 401
    data = request.json
    if len(data['description']) > 255:
        return {'errors': ['List items cannot be longer than 255 characters.']}, 400
    if len(data['description']) < 1:
        return {'errors': ['List item descriptions are required.']}, 400
    if 'is_complete' in data:
        list_item.is_complete = data['is_complete']
    if 'description' in data:
        list_item.description = data['description']
    db.session.commit()
    return list.to_dict()


@list_routes.route('/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(list_id):
    """
    Deletes a list
    """
    list = List.query.get(list_id)
    if not list:
        return {'errors': f"List {list_id} does not exist."}, 400
    if list.user_id != current_user.id:
        return {'errors': f"User is not the creator of list {list_id}."}, 401
    db.session.delete(list)
    db.session.commit()
    return {'message': 'Delete successful.'}


@list_routes.route('/items/<int:li_id>', methods=['DELETE'])
@login_required
def delete_li(li_id):
    """
    Deletes a list item
    """
    list_item = ListItem.query.get(li_id)
    if not list_item:
        return {'errors': f"List item {li_id} does not exist."}, 400
    list = List.query.get(list_item.list_id)
    if list.user_id != current_user.id:
        return {'errors': f"User is not the creator of list item {li_id}."}, 401
    db.session.delete(list_item)
    list.order = list.order.replace(f",{li_id}", '')
    db.session.commit()
    return list.to_dict()
