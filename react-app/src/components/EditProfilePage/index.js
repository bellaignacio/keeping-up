import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './EditProfile.css';

function EditProfilePage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <h1>EditProfilePage</h1>
        </>
    );
}

export default EditProfilePage;
