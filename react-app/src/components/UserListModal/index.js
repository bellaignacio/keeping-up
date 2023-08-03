import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import FollowModal from "../FollowModal";
import './UserList.css';

function UserListModal({ isSessionUser, title, users }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const sessionFollowings = useSelector((state) => state.user.followings);

    const handleUserClick = (userId) => {
        history.push(`/${userId}`);
        closeModal();
    };

    return (
        <div id="user-list-modal-container">
            <div>{title}</div>
            <div id="user-list">
                {users.map(user => {
                    return (
                        <div className="user-list-item" key={user.id}>
                            <div className="list-tile-header" onClick={() => handleUserClick(user.id)}>
                                <img className="list-tile-user-image" src={user.image_url} alt={user.username} />
                                <div>
                                    <div className="list-tile-user-name">{user.username}</div>
                                    {user.name !== null && <div>{user.name}</div>}
                                </div>
                            </div>
                            <OpenModalButton
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
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserListModal;
