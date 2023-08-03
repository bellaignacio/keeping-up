import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import FollowingBar from "../FollowingBar";
import ListTile from "../ListTile";
import * as userActions from "../../store/user";
import * as listActions from "../../store/list";
import './Home.css';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const followings = useSelector((state) => Object.values(state.user.followings));
    const followingsLists = useSelector((state) => Object.values(state.list.followings));
    const [isFollowingsListsLoaded, setIsFollowingsListsLoaded] = useState(false);

    useEffect(() => {
        dispatch(userActions.getFollowings());
        dispatch(listActions.getFollowingsLists())
            .then(() => setIsFollowingsListsLoaded(true));
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <Navigation />
            <div id="home-container">
                <FollowingBar users={followings} />
                {isFollowingsListsLoaded &&
                    <div id="list-tile-container">
                        {followingsLists.length > 0 ? (followingsLists.sort((e1, e2) => new Date(e2.created_at).getTime() - new Date(e1.created_at).getTime())).map(listObj => {
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

export default HomePage;
