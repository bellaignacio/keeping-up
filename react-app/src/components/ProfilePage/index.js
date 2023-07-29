import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
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
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);
    const [isProfileListsLoaded, setIsProfileListsLoaded] = useState(false);

    useEffect(() => {
        dispatch(userActions.getFollowings());
        dispatch(userActions.getProfile(user_id))
            .then(() => setIsProfileLoaded(true));
        dispatch(listActions.getProfileLists(user_id))
            .then(() => setIsProfileListsLoaded(true));
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/about" />;

    return (isProfileLoaded &&
        <div id="profile-container">
            <div id="profile-header">
                <div>
                    <img id="profile-image" src={profileUser.image_url} />
                </div>
                <div id="profile-info">
                    <div id="profile-info-header">
                        <p>{profileUser.username}</p>
                        {(() => {
                            if (profileUser.id === sessionUser.id) {
                                console.log(sessionFollowings);
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
                    {(!profileUser.is_public && !sessionFollowings.hasOwnProperty(profileUser.id)) &&
                        <>
                            <div>This Account is Private</div>
                            <div>Follow to see their lists</div>
                        </>
                    }
                    {(profileUser.is_public || sessionFollowings.hasOwnProperty(profileUser.id) || profileUser.id === sessionUser.id) &&
                        profileLists.map(listObj => {
                            return (
                                <p>{listObj.title}</p>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}

export default ProfilePage;
