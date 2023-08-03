import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import './About.css';

function AboutPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to={`/${sessionUser.id}`} />;

    return (
        <>
            <Navigation />
            <div>AboutPage</div>
        </>
    );
}

export default AboutPage;
