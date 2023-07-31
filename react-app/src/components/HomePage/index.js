import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ListTile from "../ListTile";
import * as userActions from "../../store/user";
import * as listActions from "../../store/list";
import './Home.css';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const publicLists = useSelector((state) => Object.values(state.list.public));
    const [isPublicListsLoaded, setIsPublicListsLoaded] = useState(false)

    useEffect(() => {
        dispatch(userActions.getFollowings());
        dispatch(listActions.getPublicLists())
            .then(() => setIsPublicListsLoaded(true));
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <div id="home-container">
            {isPublicListsLoaded &&
                <div id="list-tile-container">
                    {publicLists.map(listObj => {
                        return (
                            <ListTile listOnly={false} listObj={listObj} />
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default HomePage;
