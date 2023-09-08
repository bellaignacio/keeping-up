import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import FollowModal from "../FollowModal";
import './RecommendedBar.css';

function RecommendedBar({ users }) {
    const history = useHistory();

    return (users.length > 0 &&
        <>
            <h2 id="recommended-title">Suggestions for you</h2>
            <div id="recommended-bar-container">
                {users.map(user => {
                    return (
                        <div>
                            <div key={user.id} onClick={() => history.push(`/${user.id}`)} >
                                <img className="recommended-image" src={user.image_url} alt={user.username}
                                    onError={(e) => {
                                        e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                                        e.onerror = null;
                                    }}
                                />
                                <div className="recommended-name">{user.name ? user.name : user.username}</div>
                            </div>
                            <OpenModalButton
                                buttonText="Follow"
                                modalComponent={<FollowModal user={user} method="follow" />}
                                className="accent"
                            />
                        </div>
                    );
                })}
            </div>
        </>

    );
}

export default RecommendedBar;
