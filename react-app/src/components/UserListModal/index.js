import { useEffect  } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import FollowModal from "../FollowModal";
import * as userActions from "../../store/user";
import './UserList.css';

function UserListModal({ isSessionUser, title, users }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const sessionFollowings = useSelector((state) => state.user.followings);

    useEffect(() => {
        dispatch(userActions.getFollowings());
    }, [dispatch]);

    const handleUserClick = (userId) => {
        history.push(`/${userId}`);
        closeModal();
    };

    return (
        <div id="user-list-modal-container">
            <div id="modal-title">{title}</div>
            <div id="user-list">
                {(users.sort((a, b) => {
                    if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
                    else if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
                    else return 0;
                })).map((user) => {
                    return (
                        <div className="user-list-item" key={user.id}>
                            <div className="list-tile-header" onClick={() => handleUserClick(user.id)}>
                                <img className="list-tile-user-image" src={user.image_url} alt={user.username}
                                    onError={(e) => {
                                        e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
                                        e.onerror = null;
                                    }}
                                />
                                <div>
                                    <div className="list-tile-user-name">{user.username}</div>
                                    {user.name !== null && <div>{user.name}</div>}
                                </div>
                            </div>
                            {user.id !== sessionUser.id && <OpenModalButton
                                buttonText={
                                    (isSessionUser && title === "Following") ? "Following"
                                        : (isSessionUser && title === "Followers") ? "Remove"
                                            : (user.id in sessionFollowings) ? "Following"
                                                : "Follow"
                                }
                                modalComponent={<FollowModal
                                    user={user}
                                    method={(isSessionUser && title === "Following") ? "unfollow"
                                        : (isSessionUser && title === "Followers") ? "remove"
                                            : (user.id in sessionFollowings) ? "unfollow"
                                                : "follow"
                                    }
                                />}
                                className={
                                    (isSessionUser && title === "Following") ? "normal"
                                        : (isSessionUser && title === "Followers") ? "normal"
                                            : (user.id in sessionFollowings) ? "normal"
                                                : "accent"
                                }
                            />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserListModal;
