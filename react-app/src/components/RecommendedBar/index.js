import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import FollowModal from "../FollowModal";
import './RecommendedBar.css';

function RecommendedBar({ users }) {
    const history = useHistory();

    const fisherYatesSort = arr => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    return (users.length > 0 &&
        <>
            <h2 id="recommended-title">Suggestions for you</h2>
            <div id="recommended-bar-container">
                {fisherYatesSort(users).map(user => {
                    return (
                        <div>
                            <div key={user.id} onClick={() => history.push(`/${user.id}`)} >
                                <img className="recommended-image" src={user.image_url} alt={user.username}
                                    onError={(e) => {
                                        e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
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
