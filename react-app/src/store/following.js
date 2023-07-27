const SET_USERS = "following/SET_USERS";
const SET_LISTS = "following/SET_LISTS";

const initialState = { users: null, lists: null };

const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
});

const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
});

export const getUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/followings");
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

export const getLists = () => async (dispatch) => {
    const response = await fetch("/api/lists/followings");
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

export default function followingReducer(state = initialState, action) {
    let newState;
	switch (action.type) {
		case SET_USERS:
            const normalizedUsers = action.payload.reduce((result, userObj) => {
                result[userObj.id] = userObj;
                return result;
            }, {});
            newState = { ...state, users: normalizedUsers }
			return newState;
		case SET_LISTS:
            const normalizedLists = action.payload.reduce((result, listObj) => {
                result[listObj.id] = listObj;
                return result;
            }, {});
			newState = { ...state, lists: normalizedLists }
			return newState;
		default:
			return state;
	}
}
