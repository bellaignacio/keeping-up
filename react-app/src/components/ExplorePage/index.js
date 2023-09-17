import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import NoListsPage from "../NoListsPage";
import LoadingPage from "../LoadingPage";
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

    if (isPublicListsLoaded && publicLists.length <= 0) {
        return (
            <>
                <Navigation />
                <NoListsPage />
            </>
        );
    }

    const fisherYatesSort = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    return (
        <>
            <Navigation />
            {isPublicListsLoaded ?
                <div id="explore-container">
                    <div id="list-tile-container">
                        {/* {(publicLists.sort((e1, e2) => new Date(e2.created_at).getTime() - new Date(e1.created_at).getTime())).map((listObj) => {
                            return (
                                <ListTile key={listObj.id} listOnly={false} listObj={listObj} />
                            )
                        })} */}
                        {(fisherYatesSort(publicLists)).map((listObj) => {
                            return (
                                <ListTile key={listObj.id} listOnly={false} listObj={listObj} />
                            )
                        })}
                    </div>
                </div>
                : <LoadingPage />
            }
        </>
    );
}

export default ExplorePage;
