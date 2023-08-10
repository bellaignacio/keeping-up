import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './keepingup-logo.png';
import './Navigation.css';

function Navigation() {
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	if (sessionUser) {
		return (
			<div id="navigation-container">
				<div title="Home" id="keeping-up-icon" className="nav-icon" onClick={() => history.push('/')}><img src={logo} alt="keeping-up-logo"/></div>
				{/* <div title="Home" id="home-icon" onClick={() => history.push('/')}><i className="fas fa-home"></i></div> */}
				<div title="Explore" id="explore-icon" className="nav-icon" onClick={() => history.push('/explore')}><i className="far fa-compass"></i></div>
				<div title="Create List" id="create-icon" className="nav-icon" onClick={() => history.push('/lists/new')}><i className="far fa-plus-square"></i></div>
				<div title="Profile" id="profile-icon" className="nav-icon" onClick={() => history.push(`/${sessionUser?.id}`)}><img className="profile-icon-image" src={sessionUser?.image_url} alt={sessionUser?.username}
					onError={(e) => {
						e.target.src = "https://i.ibb.co/jTrn4Vc/default.png";
						e.onerror = null;
					}}
				/></div>
				<ProfileButton sessionUser={sessionUser} />
			</div>
		);
	} else {
		return (
			<div id="navigation-container-logged-out">
				<NavLink id="keeping-up-title" to="/about"><img src={logo} alt="keeping-up-logo"/>KeepingUp</NavLink>
				{/* <div id="keeping-up-title" onClick={() => history.push('/about')}>
					<img src={logo} alt="keeping-up-logo"/>
					<span>Keeping Up</span>
				</div> */}
				<div id="account-buttons">
					<button className="primary" onClick={() => history.push("/login")}>Log in</button>
					<button className="accent" onClick={() => history.push("/signup")}>Sign up</button>
				</div>
			</div>
		);
	}
}

export default Navigation;
