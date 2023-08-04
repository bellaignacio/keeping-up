import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import './EditProfile.css';

function EditProfilePage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <Navigation />
            <div id="edit-profile-container">
                <div>EditProfilePage</div>
                <div>Coming Soon...</div>
            </div>
        </>
    );
}

export default EditProfilePage;
