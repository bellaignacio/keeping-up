import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Explore.css';

function ExplorePage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;
    
    return (
        <>
            <h1>ExplorePage</h1>
        </>
    );
}

export default ExplorePage;
