from flask.cli import AppGroup
from .users import seed_users, undo_users
from .lists import seed_lists, undo_lists
from .list_items import seed_list_items, undo_list_items
from .list_styles import seed_list_styles, undo_list_styles
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_lists()
        undo_list_items()
        undo_list_styles()
        undo_comments()
        undo_likes()
    (demo, aurora, john, jane, tyler) = seed_users()
    seed_lists(demo, aurora, john, jane, tyler)
    seed_list_items()
    seed_list_styles()
    seed_comments(demo, aurora, john, jane, tyler)
    seed_likes(demo, aurora, john, jane, tyler)


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_lists()
    undo_list_items()
    undo_list_styles()
    undo_comments()
    undo_likes()
