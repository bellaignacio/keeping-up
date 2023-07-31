import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import ListTile from "../ListTile";
import * as userActions from "../../store/user";
import * as listActions from "../../store/list";
import './Profile.css';

function ProfilePage() {
    const { user_id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const sessionFollowings = useSelector((state) => state.user.followings);
    const profileUser = useSelector((state) => state.user.profile);
    const profileLists = useSelector((state) => Object.values(state.list.profile));
    const [isFollowingsLoaded, setIsFollowingsLoaded] = useState(false);
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);
    const [isProfileListsLoaded, setIsProfileListsLoaded] = useState(false);

    useEffect(() => {
        dispatch(userActions.getFollowings())
            .then(() => setIsFollowingsLoaded(true));
        dispatch(userActions.getProfile(user_id))
            .then(() => setIsProfileLoaded(true));
        dispatch(listActions.getProfileLists(user_id))
            .then(() => setIsProfileListsLoaded(true));
    }, [dispatch, user_id]);

    if (!sessionUser) return <Redirect to="/about" />;

    return ((isProfileLoaded && isFollowingsLoaded) &&
        <div id="profile-container">
            <div id="profile-header">
                <div>
                    <img id="profile-image" src={profileUser.image_url} alt={profileUser.username} />
                </div>
                <div id="profile-info">
                    <div id="profile-info-header">
                        <p>{profileUser.username}</p>
                        {(() => {
                            if (profileUser.id === sessionUser.id) {
                                return (<button>Edit profile</button>);
                            } else if (sessionFollowings.hasOwnProperty(profileUser.id)) {
                                return (<button>Following</button>);
                            } else {
                                return (<button>Follow</button>);
                            }
                        })()}
                    </div>
                    <div id="profile-summary">
                        <p>{profileUser.total_lists} lists</p>
                        <p>{profileUser.total_followers} followers</p>
                        <p>{profileUser.total_followings} following</p>
                    </div>
                    <p>{profileUser.name}</p>
                    <p>{profileUser.bio}</p>
                </div>
            </div>
            <hr id="profile-hr"></hr>
            {isProfileListsLoaded &&
                <div id="profile-content">
                    {(() => {
                        if ((profileUser.id === sessionUser.id && profileUser.total_lists === 0)) {
                            return (<button>Create a list</button>);

                        } else if (!profileUser.is_public && !sessionFollowings.hasOwnProperty(profileUser.id)) {
                            return (<>
                                <div>This Account is Private</div>
                                <div>Follow to see their lists.</div>
                            </>);
                        } else if (profileUser.total_lists === 0) {
                            return (<div>This Account has no lists.</div>);
                        }
                    })()}
                    <div id="list-tile-container">
                    {(profileUser.is_public || sessionFollowings.hasOwnProperty(profileUser.id) || profileUser.id === sessionUser.id) &&
                        profileLists.map(listObj => {
                            return (
                                <ListTile listOnly={true} listObj={listObj} />
                            );
                        })
                    }
                    </div>
                </div>
            }
        </div>
    );
}

export default ProfilePage;
