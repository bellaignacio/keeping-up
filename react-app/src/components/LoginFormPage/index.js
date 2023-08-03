import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import Navigation from "../Navigation";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/${sessionUser.id}`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credentials, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <Navigation />
      <div id="login-container">
        <form id="login-form" onSubmit={handleSubmit}>
          <NavLink to="/about">KeepingUp</NavLink>
          {errors.length > 0 && <ul className="error-message-container">
            {errors.map((error, idx) => (
              <li className="error-message" key={idx}>{error}</li>
            ))}
          </ul>}
          <label>
            <input
              type="text"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              placeholder="Username or Email"
              required
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
          <button type="submit">Log in</button>
          <button onClick={(e) => {
            setCredentials('demo@aa.io');
            setPassword('password');
          }}>Demo User</button>
        </form>
        <div id="login-to-signup">
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
