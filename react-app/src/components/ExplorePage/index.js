import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import ListTile from "../ListTile";
import * as userActions from "../../store/user";
import * as listActions from "../../store/list";
import './Explore.css';

function ExplorePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const publicLists = useSelector((state) => Object.values(state.list.public));
    const [isPublicListsLoaded, setIsPublicListsLoaded] = useState(false);

    useEffect(() => {
        dispatch(userActions.getFollowings());
        dispatch(listActions.getPublicLists())
            .then(() => setIsPublicListsLoaded(true));
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <Navigation />
            <div id="explore-container">
                {isPublicListsLoaded &&
                    <div id="list-tile-container">
                        {publicLists.length > 0 ? (publicLists.sort((e1, e2) => new Date(e2.created_at).getTime() - new Date(e1.created_at).getTime())).map(listObj => {
                            return (
                                <ListTile listOnly={false} listObj={listObj} />
                            );
                        }) : <div>There are no lists to show. Check again later!</div>}
                    </div>
                }
            </div>
        </>
    );
}

export default ExplorePage;
