import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/user";
import RecommendedBar from "../RecommendedBar";
import LoadingPage from "../LoadingPage";
import './NoLists.css';

function NoListsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => Object.values(state.user.public));
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    useEffect(() => {
        dispatch(userActions.getPublic())
            .then(() => setIsUsersLoaded(true));
    }, [dispatch]);

    return (isUsersLoaded ?
        <div id="no-lists-container">
            <h1>All Caught Up!</h1>
            <div>There are no lists to show. <NavLink to={`/${sessionUser.id}`}>Go back to Profile.</NavLink></div>
            <RecommendedBar users={users}/>
        </div>
        : <LoadingPage />
    );
}

export default NoListsPage;
