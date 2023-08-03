import { useHistory } from "react-router";
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

    return (
        <div id="follow-modal-container">
            <form id="follow-form">
                <div className="list-tile-header">
                    <img className="list-tile-user-image" src={user.image_url} alt={user.username} />
                    <div className="list-tile-user-name" >{user.username}</div>
                </div>
                <button onClick={handleClick}>
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
