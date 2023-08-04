import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	if (sessionUser) {
		return (
			<div id="navigation-container">
				<div id="keeping-up-icon" onClick={() => history.push('/')}><i className="fas fa-tasks"></i></div>
				<div id="home-icon" onClick={() => history.push('/')}><i className="fas fa-home"></i></div>
				<div id="explore-icon" onClick={() => history.push('/explore')}><i className="far fa-compass"></i></div>
				<div id="create-icon" onClick={() => history.push('/lists/new')}><i className="far fa-plus-square"></i></div>
				<div id="profile-icon" onClick={() => history.push(`/${sessionUser?.id}`)}><img className="profile-icon-image" src={sessionUser?.image_url} alt={sessionUser?.username}
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
			<div id="navigation-container" className="logged-out">
				<div id="keeping-up-title" onClick={() => history.push('/about')}>
					<i className="fas fa-tasks"></i>
					<span>Keeping Up</span>
				</div>
				<div id="account-buttons">
					<button onClick={() => history.push("/login")}>Log in</button>
					<button onClick={() => history.push("/signup")}>Sign up</button>
				</div>
			</div>
		);
	}
}

export default Navigation;
