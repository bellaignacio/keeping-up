import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
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

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(email, username, name, bio, imgUrl, isPublic, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Bio
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </label>
        <label>
          Public
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(!isPublic)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
