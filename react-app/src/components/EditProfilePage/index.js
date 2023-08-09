import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { editProfile } from "../../store/session";
import Navigation from "../Navigation";
import './EditProfile.css';

function EditProfilePage() {
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
                    <div>
                        <label>
                            Username
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <div className={`character-counter ${username?.length > 50 ? 'character-counter-red' : ''}`}>{username !== null ? username.length : 0} / 50</div>
                        </label>
                    </div>
                    <div>
                        <label>
                            Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                            <div className={`character-counter ${name?.length > 50 ? 'character-counter-red' : ''}`}>{name !== null ? name.length : 0} / 50</div>
                        </label>
                    </div>
                    <div>
                        <label>
                            Bio
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Bio"
                            />
                        </label>
                        <div className={`character-counter ${bio?.length > 150 ? 'character-counter-red' : ''}`}>{bio !== null ? bio.length : 0} / 150</div>
                    </div>

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
                    <button className="accent" type="submit">Save</button>
                    <button className="normal" onClick={() => history.push(`/${sessionUser.id}`)}>Cancel</button>
                </form>
            </div>
        </>
    );
}

export default EditProfilePage;
