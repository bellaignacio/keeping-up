import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import logo from './keepingup-logo.png';
import Navigation from "../Navigation";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/${sessionUser.id}`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const form = document.getElementById("signup-form");
      const formData = new FormData(form);
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Passwords do not match.']);
    }
  };

  const displayFile = (e) => {
    e.preventDefault();
    const img = document.getElementById("signup-upload-image");
    img.src = URL.createObjectURL(e.target.files[0]);
  };

  const removeFile = (e) => {
    e.preventDefault();
    const img = document.getElementById("signup-upload-image");
    img.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
    const upload = document.getElementById("signup-upload");
    upload.value = "";
  };

  return (
    <>
      <Navigation />
      <div id="signup-container">
        <form id="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <NavLink className="keeping-up" id="signup-form-title" to="/about"><img src={logo} alt="keeping-up-logo" />Keeping Up</NavLink>
          {errors.length > 0 && <ul className="error-message-container">
            {errors.map((error, idx) => (
              <li className="error-message" key={idx}>{error}</li>
            ))}
          </ul>}
          <label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
          <div>
            <label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </label>
            <div className={`character-counter ${username?.length > 50 ? 'character-counter-red' : ''}`}>{username !== null ? username.length : 0} / 50</div>
          </div>
          <div>
            <label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </label>
            <div className={`character-counter ${name?.length > 50 ? 'character-counter-red' : ''}`}>{name !== null ? name.length : 0} / 50</div>
          </div>
          <div>
            <label>
              <input
                type="text"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
            </label>
            <div className={`character-counter ${bio?.length > 150 ? 'character-counter-red' : ''}`}>{bio !== null ? bio.length : 0} / 150</div>
          </div>
          <label>
            Profile Image
            <input
              id="signup-upload"
              type="file"
              name="image_url"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                setImgUrl(e.target.files[0]);
                displayFile(e);
              }}
            />
            <img id="signup-upload-image"
              src={"https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png"}
              onError={(e) => {
                e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
                e.onerror = null;
              }}
              alt="signup-upload-preview"
            />
            <button
              id="signup-upload-remove"
              onClick={(e) => {
                setImgUrl(null);
                removeFile(e);
            }}>&#x2715;</button>
          </label>
          <label>
            Make Account Public?
            <input
              id="checkbox"
              type="checkbox"
              name="is_public"
              checked={isPublic}
              onChange={(e) => setIsPublic(!isPublic)}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          <label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </label>
          <button id="signup-form-button" className="accent" type="submit">Sign up</button>
        </form>
        <div id="signup-to-login">
          Have an account? <NavLink to="/login">Log in</NavLink>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
