import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import './Explore.css';

function ExplorePage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <Navigation />
            <div id="explore-container">
                <div>ExplorePage</div>
            </div>
        </>
    );
}

export default ExplorePage;
