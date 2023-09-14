import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
    document.getElementById("search-container").classList.add("search-closed");
    document.getElementById("search-container").classList.remove("search-open");
    document.querySelectorAll(".nav-icon").forEach(el => el.classList.remove("search-open"));
		document.querySelectorAll(".nav-icon-label").forEach(el => el.classList.remove("search-open"));
		document.getElementById("profile-dropdown").classList.remove("search-open");
		document.querySelector("#keeping-up-icon img").classList.remove("search-open");
  };
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push('/about');
  };

  return (
    <>
      <div title="Menu" className="nav-icon" onClick={openMenu}>
        <div><i className="fas fa-bars"></i></div>
        <div className="nav-icon-label">Menu</div>
      </div>
      <div id="profile-dropdown" className={showMenu ? "" : "hidden"}>
        {sessionUser ? (
          <>
            <div>
              <button onClick={() => history.push(`/edit`)}>Settings</button>
            </div>
            <div>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
