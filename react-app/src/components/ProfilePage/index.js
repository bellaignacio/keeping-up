import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Profile.css';

function ProfilePage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <h1>ProfilePage</h1>
        </>
    );
}

export default ProfilePage;
