import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
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
      const data = await dispatch(signUp(email, username, name, bio, imgUrl, isPublic, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Passwords do not match.']);
    }
  };

  return (
    <>
      <Navigation />
      <div id="signup-container">
        <form id="signup-form" onSubmit={handleSubmit}>
          <NavLink id="signup-form-title" to="/about">Keeping Up</NavLink>
          {errors.length > 0 && <ul className="error-message-container">
            {errors.map((error, idx) => (
              <li className="error-message" key={idx}>{error}</li>
            ))}
          </ul>}
          <label>
            <input
              type="text"
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />
            </label>
            <div className={`character-counter ${bio?.length > 150 ? 'character-counter-red' : ''}`}>{bio !== null ? bio.length : 0} / 150</div>
          </div>
          <label>
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
          <label>
            <input
              type="password"
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
          <button className="accent" type="submit">Sign up</button>
        </form>
        <div id="signup-to-login">
          Have an account? <NavLink to="/login">Log in</NavLink>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
