import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './NoLists.css';

function NoListsPage() {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div id="no-lists-container">
            <h1>All Caught Up!</h1>
            <div>There are no lists to show. <NavLink to={`/${sessionUser.id}`}>Go back to Profile.</NavLink></div>
        </div>
    );
}

export default NoListsPage;
