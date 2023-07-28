const SET_USER = "session/SET_USER";
export const REMOVE_USER = "session/REMOVE_USER";

const initialState = { user: null };

const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const removeUser = () => ({
	type: REMOVE_USER
});

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json"
		}
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setUser(data));
	}
};

export const login = (credentials, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			credentials,
			password
		})
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json"
		}
	});
	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (email, username, name, bio, imgUrl, isPublic, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email,
			username,
			name,
			bio,
			...!!imgUrl && {image_url: imgUrl},
			is_public: isPublic,
			password
		})
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function sessionReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = { ...state, user: action.payload };
			return newState;
		case REMOVE_USER:
			newState = { ...initialState };
			return newState;
		default:
			return state;
	}
}
