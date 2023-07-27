const SET_USERS = "public/SET_USERS";
const REMOVE_USERS = "public/REMOVE_USERS";
const SET_LISTS = "public/SET_LISTS";
const REMOVE_LISTS = "public/REMOVE_LISTS";

const initialState = { users: null, lists: null };

export default function publicReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
