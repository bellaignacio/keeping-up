const SET_USER = "session/SET_USER";
const SET_LISTS = "session/SET_LISTS";
const SET_USERS = "session/SET_USERS";
export const REMOVE_USER = "session/REMOVE_USER";

const initialState = {
	user: null,
	lists: {},
	users: {}
};

const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const setLists = (lists) => ({
	type: SET_LISTS,
	payload: lists
});

const setUsers = (users) => ({
	type: SET_USERS,
	payload: users
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

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: formData
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

export const editProfile = (userId, formData) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		method: "PUT",
		body: formData
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

export const getAllLists = () => async (dispatch) => {
	const response = await fetch("/api/lists/all");
	if (response.ok) {
		const data = await response.json();
		dispatch(setLists(data.lists));
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getAllUsers = () => async (dispatch) => {
	const response = await fetch("/api/users/all");
	if (response.ok) {
		const data = await response.json();
		dispatch(setUsers(data.users));
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const normalizeLists = (listsList) => {
    return listsList.reduce((result, listObj) => {
        result[listObj.id] = listObj;
        return result;
    }, {});
};

const normalizeUsers = (usersList) => {
    return usersList.reduce((result, userObj) => {
        result[userObj.id] = userObj;
        return result;
    }, {});
};

export default function sessionReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = { ...state, user: action.payload };
			return newState;
		case SET_LISTS:
			newState = { ...state, lists: normalizeLists(action.payload) };
			return newState;
		case SET_USERS:
			newState = { ...state, users: normalizeUsers(action.payload) };
			return newState;
		case REMOVE_USER:
			newState = { ...initialState };
			return newState;
		default:
			return state;
	}
}
