import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { editProfile } from "../../store/session";
import Navigation from "../Navigation";
import UnavailablePage from "../UnavailablePage";
import './EditProfile.css';

function EditProfilePage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState(sessionUser.username);
    const [name, setName] = useState(sessionUser.name);
    const [bio, setBio] = useState(sessionUser.bio);
    const [imgUrl, setImgUrl] = useState(sessionUser.image_url);
    const [isPublic, setIsPublic] = useState(sessionUser.is_public);
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/about" />;

    if (userId !== sessionUser.id || Object.keys(sessionUser).length === 0) {
        return (
            <>
                <Navigation />
                <UnavailablePage />
            </>
        );
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const data = await dispatch(editProfile(
            sessionUser.id,
            username,
            (name?.length > 0 ? name : null),
            (bio?.length > 0 ? bio : null),
            (imgUrl?.length > 0 ? imgUrl : "https://i.ibb.co/jTrn4Vc/default.png"),
            isPublic,
            password
        ));
        if (data) {
            setErrors(data);
        } else {
            history.push(`/${sessionUser.id}`);
        }
    };

    return (
        <>
            <Navigation />
            <div id="edit-profile-container">
                <form id="edit-profile-form" onSubmit={handleEdit}>
                    <div id="edit-profile-form-title">
                        <img className="list-tile-user-image" src={sessionUser.image_url} alt={sessionUser.username}
                            onError={(e) => {
                                e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
                                e.onerror = null;
                            }}
                        />
                        <div className="list-tile-user-name" >{sessionUser.username}</div>
                    </div>
                    {errors.length > 0 && <ul className="error-message-container">
                        {errors.map((error, idx) => (
                            <li className="error-message" key={idx}>{error}</li>
                        ))}
                    </ul>}
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </label>
                    <label>
                        Bio
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Bio"
                        />
                    </label>
                    <label>
                        Profile Image URL
                        <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            placeholder="Profile Image URL"
                        />
                    </label>
                    <label>
                        Make Account Public?
                        <input
                            id="checkbox"
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(!isPublic)}
                        />
                    </label>
                    <br></br>
                    <label>
                        Enter Password to Confirm Changes
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button onClick={() => history.push(`/${sessionUser.id}`)}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default EditProfilePage;
