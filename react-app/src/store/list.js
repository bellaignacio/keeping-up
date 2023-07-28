export const SET_FOLLOWINGS_LISTS = "list/SET_FOLLOWINGS_LISTS";
export const SET_PUBLIC_LISTS = "list/SET_PUBLIC_LISTS";
export const SET_PROFILE_LISTS = "list/SET_PROFILE_LISTS";

const initialState = {
    followings: null,
    public: null,
    profile: null
};

const setFollowingsLists = (lists) => ({
    type: SET_FOLLOWINGS_LISTS,
    payload: lists
});

const setPublicLists = (lists) => ({
    type: SET_PUBLIC_LISTS,
    payload: lists
});

const setProfileLists = (lists) => ({
    type: SET_PROFILE_LISTS,
    payload: lists
});

export const getFollowingsLists = () => async (dispatch) => {
    const response = await fetch("/api/lists/followings");
    if (response.ok) {
        const data = await response.json();
        dispatch(setFollowingsLists(data.lists));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
		return ["An error occurred. Please try again."];
    }
};

export const getPublicLists = () => async (dispatch) => {
    const response = await fetch("/api/lists/public");
    if (response.ok) {
        const data = await response.json();
        dispatch(setPublicLists(data.lists));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
		return ["An error occurred. Please try again."];
    }
};

export const getProfileLists = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setProfileLists(data.lists));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
		return ["An error occurred. Please try again."];
    }
};

function normalizeLists(listsList) {
    return listsList.reduce((result, listObj) => {
        result[listObj.id] = listObj;
        return result;
    }, {});
}

export default function listReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_FOLLOWINGS_LISTS:
            newState = { ...state, followings: normalizeLists(action.payload) }
			return newState;
        case SET_PUBLIC_LISTS:
            newState = { ...state, public: normalizeLists(action.payload) }
			return newState;
        case SET_PROFILE_LISTS:
            newState = { ...state, profile: normalizeLists(action.payload) }
			return newState;
        default:
            return state;
    }
}