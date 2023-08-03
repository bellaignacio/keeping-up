import { useHistory } from "react-router-dom";
import './FollowingBar.css';

function FollowingBar({ users }) {
    const history = useHistory();

    return (
        <div id="following-bar-container">
            {users.map(user => {
                return (
                    <div key={user.id} onClick={() => history.push(`/${user.id}`)} >
                        <img className="following-image" src={user.image_url} alt={user.username}/>
                        <div className="following-username">{user.username}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default FollowingBar;
