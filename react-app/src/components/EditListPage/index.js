import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './EditList.css';

function EditListPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <h1>EditListPage</h1>
        </>
    );
}

export default EditListPage;
