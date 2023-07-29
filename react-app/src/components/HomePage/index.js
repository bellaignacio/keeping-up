import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Home.css';

function HomePage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/about" />;

    return (
        <>
            <h1>HomePage</h1>
        </>
    );
}

export default HomePage;
