import { useHistory } from "react-router-dom";
import './FollowingBar.css';

function FollowingBar({ users }) {
    const history = useHistory();

    return (users.length > 0 &&
        <div id="following-bar-container">
            {users.map((user) => {
                return (
                    <div key={user.id} onClick={() => history.push(`/${user.id}`)} >
                        <img className="following-image" src={user.image_url} alt={user.username}
                            onError={(e) => {
                                e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
                                e.onerror = null;
                            }}
                        />
                        <div className="following-username">{user.username}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default FollowingBar;
