import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './List.css';

function ListPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <h1>ListPage</h1>
        </>
    );
}

export default ListPage;
