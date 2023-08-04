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
          <NavLink to="/about">Keeping Up</NavLink>
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
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </label>
          <label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </label>
          <label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
            />
          </label>
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
          <button type="submit">Sign up</button>
        </form>
        <div id="signup-to-login">
          Have an account? <NavLink to="/login">Log in</NavLink>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
