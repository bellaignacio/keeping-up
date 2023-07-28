import { SET_FOLLOWINGS_LISTS, SET_PUBLIC_LISTS, SET_PROFILE_LISTS } from './list';

const SET_FOLLOWINGS = "user/SET_FOLLOWINGS";
const SET_FOLLOWERS = "user/SET_FOLLOWERS";
const SET_PUBLIC = "user/SET_PUBLIC";
const SET_PROFILE = "user/SET_PROFILE";

const initialState = {
    followings: null,
    followers: null,
    public: null,
    profile: null
};

const setFollowings = (users) => ({
    type: SET_FOLLOWINGS,
    payload: users
});

const setFollowers = (users) => ({
    type: SET_FOLLOWERS,
    payload: users
});

const setPublic = (users) => ({
    type: SET_PUBLIC,
    payload: users
});

const setProfile = (user) => ({
    type: SET_PROFILE,
    payload: user
});

export const getFollowings = () => async (dispatch) => {
    const response = await fetch("/api/users/followings");
    if (response.ok) {
        const data = await response.json();
        dispatch(setFollowings(data.users));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getFollowers = () => async (dispatch) => {
    const response = await fetch("/api/users/followers");
    if (response.ok) {
        const data = await response.json();
        dispatch(setFollowers(data.users));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getPublic = () => async (dispatch) => {
    const response = await fetch("/api/users/public");
    if (response.ok) {
        const data = await response.json();
        dispatch(setPublic(data.users));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getProfile = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setProfile(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

function normalizeUsers(usersList) {
    return usersList.reduce((result, userObj) => {
        result[userObj.id] = userObj;
        return result;
    }, {});
}

function normalizeLists(listsList) {
    return listsList.reduce((result, listObj) => {
        result[listObj.id] = listObj;
        return result;
    }, {});
}

export default function userReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_FOLLOWINGS:
            newState = { ...state, followings: normalizeUsers(action.payload) };
            return newState;
        case SET_FOLLOWERS:
            newState = { ...state, followers: normalizeUsers(action.payload) };
            return newState;
        case SET_PUBLIC:
            newState = { ...state, public: normalizeUsers(action.payload) };
            return newState;
        case SET_PROFILE:
            newState = { ...state, profile: action.payload };
            return newState;
        // case SET_PROFILE_LISTS: // whenever listActions.getProfileLists(id) is called, it will load those lists into the current state.user.profile (even if it has a different user!)
        //     newState = {
        //         ...state,
        //         profile: {
        //             ...state.profile,
        //             lists: normalizeLists(action.payload)
        //         }
        //     };
        //     return newState;
        default:
            return state;
    }
}