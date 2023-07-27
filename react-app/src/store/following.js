const SET_USERS = "following/SET_USERS";
const REMOVE_USERS = "following/REMOVE_USERS";
const SET_LISTS = "following/SET_LISTS";
const REMOVE_LISTS = "following/REMOVE_LISTS";

const initialState = { users: null, lists: null };

export default function followingReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
