import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './About.css';

function AboutPage() {
    const sessionUser = useSelector((state) => state.session.user);
    
    if (sessionUser) return <Redirect to={`/${sessionUser.username}`} />;

    return (
        <>
            <h1>AboutPage</h1>
        </>
    );
}

export default AboutPage;
