import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from "../Search";
import ProfileButton from './ProfileButton';
import logo from './keepingup-logo.png';
import './Navigation.css';

function Navigation() {
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	const closeSearch = (route) => {
		document.getElementById("search-container").classList.add("search-closed");
		document.getElementById("search-container").classList.remove("search-open");
		document.querySelectorAll(".nav-icon").forEach((el) => el.classList.remove("search-open"));
		document.querySelectorAll(".nav-icon-label").forEach((el) => el.classList.remove("search-open"));
		document.getElementById("profile-dropdown").classList.remove("search-open");
		document.querySelector("#keeping-up-icon img").classList.remove("search-open");
		history.push(route);
	};

	const toggleSearch = () => {
		document.getElementById("search-container").classList.toggle("search-closed");
		document.getElementById("search-container").classList.toggle("search-open");
		document.querySelectorAll(".nav-icon").forEach((el) => el.classList.toggle("search-open"));
		document.querySelectorAll(".nav-icon-label").forEach((el) => el.classList.toggle("search-open"));
		document.getElementById("profile-dropdown").classList.toggle("search-open");
		document.querySelector("#keeping-up-icon img").classList.toggle("search-open");
	};

	if (sessionUser) {
		return (
			<>
				<div id="navigation-container">
					<div title="Keeping Up" id="keeping-up-icon" className="nav-icon" onClick={() => closeSearch('/')}>
						<img id="keeping-up-icon-image" src={logo} alt="keeping-up-logo" />
						<div className="nav-icon-label">Keeping Up</div>
					</div>
					<div title="Home" id="home-icon" className="nav-icon" onClick={() => closeSearch('/')}>
						<div><i className="fas fa-home"></i></div>
						<div className="nav-icon-label">Home</div>
					</div>
					<div title="Search" id="search-icon" className="nav-icon" onClick={toggleSearch}>
						<div><i className="fas fa-search"></i></div>
						<div className="nav-icon-label">Search</div>
					</div>
					<div title="Explore" id="explore-icon" className="nav-icon" onClick={() => closeSearch('/explore')}>
						<div><i className="far fa-compass"></i></div>
						<div className="nav-icon-label">Explore</div>
					</div>
					<div title="Create List" id="create-icon" className="nav-icon" onClick={() => closeSearch('/lists/new')}>
						<div><i className="far fa-plus-square"></i></div>
						<div className="nav-icon-label">Create</div>
					</div>
					<div title="Profile" id="profile-icon" className="nav-icon" onClick={() => closeSearch(`/${sessionUser?.id}`)}>
						<img id="profile-icon-image" src={sessionUser?.image_url} alt={sessionUser?.username}
							onError={(e) => {
								e.target.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
								e.onerror = null;
							}}
						/>
						<div className="nav-icon-label">Profile</div>
					</div>
					<ProfileButton sessionUser={sessionUser} />
				</div>
				<Search />
			</>
		);
	} else {
		return (
			<div id="navigation-container-logged-out">
				<NavLink className="keeping-up" id="keeping-up-title" to="/about"><img src={logo} alt="keeping-up-logo" />Keeping Up</NavLink>
				<div id="account-buttons">
					<button className="primary" onClick={() => history.push("/login")}>Log in</button>
					<button className="accent" onClick={() => history.push("/signup")}>Sign up</button>
				</div>
			</div>
		);
	}
}

export default Navigation;
