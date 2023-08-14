import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import UnavailablePage from "../UnavailablePage";
import LoadingPage from "../LoadingPage";
import ListTile from "../ListTile";
import OpenModalButton from "../OpenModalButton";
import FollowModal from "../FollowModal";
import UserListModal from "../UserListModal";
import * as userActions from "../../store/user";
import * as listActions from "../../store/list";
import './Profile.css';

function ProfilePage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
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
        dispatch(userActions.getProfile(userId))
            .then(() => setIsProfileLoaded(true));
        dispatch(listActions.getProfileLists(userId))
            .then(() => setIsProfileListsLoaded(true));
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to="/about" />;

    if (isProfileLoaded && Object.keys(profileUser).length === 0) {
        return (
            <>
                <Navigation />
                <UnavailablePage />
            </>
        );
    }

    return (
        <>
            <Navigation />
            {(isProfileLoaded && isFollowingsLoaded) ?
                <div id="profile-container">
                    <div id="profile-header">
                        <div>
                            <img id="profile-image" src={profileUser.image_url} alt={profileUser.username}
                                onError={(e) => {
                                    e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                                    e.onerror = null;
                                }}
                            />
                        </div>
                        <div id="profile-info">
                            <div id="profile-info-header">
                                <div style={{fontSize: "20px"}}>{profileUser.username}</div>
                                {(() => {
                                    if (profileUser.id === sessionUser.id) {
                                        return (
                                            <button
                                                className="normal"
                                                onClick={() => history.push(`/edit`)}>Edit profile
                                            </button>
                                        );
                                    } else if (sessionFollowings.hasOwnProperty(profileUser.id)) {
                                        return (
                                            <OpenModalButton
                                                buttonText="Following"
                                                modalComponent={<FollowModal user={profileUser} method={"unfollow"} />}
                                                className="normal"
                                            />);
                                    } else {
                                        return (
                                            <OpenModalButton
                                                buttonText="Follow"
                                                modalComponent={<FollowModal user={profileUser} method={"follow"} />}
                                                className="accent"
                                            />);
                                    }
                                })()}
                            </div>
                            <div id="profile-summary">
                                <div>{profileUser.total_lists} list{(profileUser.total_lists > 1 || profileUser.total_lists === 0) && 's'}</div>
                                <OpenModalButton
                                    buttonText={`${profileUser.total_followers} follower${(profileUser.total_followers > 1 || profileUser.total_followers === 0) ? 's' : ''}`}
                                    modalComponent={<UserListModal isSessionUser={profileUser.id === sessionUser.id} title="Followers" users={profileUser.followers} />}
                                    disabled={profileUser.total_followers === 0}
                                />
                                <OpenModalButton
                                    buttonText={`${profileUser.total_followings} following`}
                                    modalComponent={<UserListModal isSessionUser={profileUser.id === sessionUser.id} title="Following" users={profileUser.followings} />}
                                    disabled={profileUser.total_followings === 0}
                                />
                            </div>
                            <div style={{fontWeight: "bold"}}>
                                {profileUser.name}
                                <p style={{fontWeight: "normal", marginTop: "5px"}}>{profileUser.bio}</p>
                            </div >
                        </div>
                    </div>
                    <hr id="profile-hr"></hr>
                    {isProfileListsLoaded &&
                        <div id="profile-content">
                            {(() => {
                                if (profileUser.id === sessionUser.id && profileUser.total_lists === 0) {
                                    return (<button className="normal" onClick={() => history.push('/lists/new')}>Create a list</button>);
                                } else if (profileUser.id !== sessionUser.id && !profileUser.is_public && !sessionFollowings.hasOwnProperty(profileUser.id)) {
                                    return (<>
                                        <div>This Account is Private.</div>
                                        <div>Follow to see their lists.</div>
                                    </>);
                                } else if (profileUser.total_lists === 0) {
                                    return (<div>This Account has no lists.</div>);
                                }
                            })()}
                            <div id="list-tile-container">
                                {(profileUser.is_public || sessionFollowings.hasOwnProperty(profileUser.id) || profileUser.id === sessionUser.id) &&
                                    (profileLists.sort((e1, e2) => new Date(e2.created_at).getTime() - new Date(e1.created_at).getTime())).map(listObj => {
                                        return (
                                            <ListTile listOnly={true} listObj={listObj} />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
                : <LoadingPage />
            }
        </>
    );
}

export default ProfilePage;
