import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as userActions from "../../store/user";
import './Follow.css';

function FollowModal({ user, method }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if (method === 'follow') {
            dispatch(userActions.followUser(user.id));
        } else if (method === 'unfollow') {
            dispatch(userActions.unfollowUser(user.id));
        } else if (method === 'remove') {
            dispatch(userActions.removeFollower(user.id));
        }
        history.push(`/${user.id}`);
        closeModal();
    };

    const handleUserClick = (userId) => {
        history.push(`/${userId}`);
        closeModal();
    };

    return (
        <div id="follow-modal-container">
            <div id="modal-title" className="list-tile-header" onClick={() => handleUserClick(user.id)}>
                <img className="list-tile-user-image" src={user.image_url} alt={user.username}
                    onError={(e) => {
                        e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
                        e.onerror = null;
                    }}
                />
                <div className="list-tile-user-name" >{user.username}</div>
            </div>
            <form id="follow-form">
                <button className="primary" onClick={handleClick}>
                    {method === 'follow' && `Follow?`}
                    {method === 'unfollow' && `Unfollow?`}
                    {method === 'remove' && `Remove follower?`}
                </button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default FollowModal;
