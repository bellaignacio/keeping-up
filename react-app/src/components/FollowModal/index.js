import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as userActions from "../../store/user";
import './Follow.css';

function FollowModal({ user, method }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        if (method === 'follow') {
            dispatch(userActions.followUser(user.id));
        } else if (method === 'unfollow') {
            dispatch(userActions.unfollowUser(user.id));
        } else if (method === 'remove') {
            dispatch(userActions.removeFollower(user.id));
        }
        closeModal();
    };

    return (
        <div id="follow-modal-container">
            <form id="follow-form">
                <button onClick={handleClick}>
                    {method === 'follow' && `Follow ${user.username}?`}
                    {method === 'unfollow' && `Unfollow ${user.username}?`}
                    {method === 'remove' && `Remove ${user.username} as a follower?`}
                </button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default FollowModal;
