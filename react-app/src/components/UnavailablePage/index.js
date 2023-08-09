import { NavLink } from "react-router-dom";
import './Unavailable.css';

function UnavailablePage() {
    return (
        <div id="unavailable-container">
            <h1>Sorry, this page isn't available.</h1>
            <div>The link you followed may be broken, or the page may have been removed. <NavLink to="/">Go back to Home.</NavLink></div>
        </div>
    );
}

export default UnavailablePage;
