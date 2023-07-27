const SET_USER = "profile/SET_USER";
const REMOVE_USER = "profile/REMOVE_USER";
const SET_LISTS = "profile/SET_LISTS";
const REMOVE_LISTS = "profile/REMOVE_LISTS";

const initialState = { user: null, lists: null };

export default function profileReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
