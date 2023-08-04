import { REMOVE_USER } from "./session";

const SET_FOLLOWINGS = "user/SET_FOLLOWINGS";
const SET_FOLLOWERS = "user/SET_FOLLOWERS";
const SET_PUBLIC = "user/SET_PUBLIC";
const SET_PROFILE = "user/SET_PROFILE";
const ADD_FOLLOW = "user/ADD_FOLLOW";
const DELETE_FOLLOW = "user/DELETE_FOLLOW";
const DELETE_FOLLOWER = "user/DELETE_FOLLOWER";

const initialState = {
    followings: {},
    followers: {},
    public: {},
    profile: {}
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

const addFollow = (user) => ({
    type: ADD_FOLLOW,
    payload: user
});

const deleteFollow = (user) => ({
    type: DELETE_FOLLOW,
    payload: user
});

const deleteFollower = (user) => ({
    type: DELETE_FOLLOWER,
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

export const followUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}`, {
        method: "POST",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addFollow(data));
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

export const unfollowUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFollow(data));
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

export const removeFollower = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/remove/${userId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFollower(data));
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

export default function userReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case REMOVE_USER:
            newState = { ...initialState };
            return newState;
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
        case ADD_FOLLOW:
            newState = {
                ...state,
                followings: {
                    ...state.followings,
                    [action.payload.id]: action.payload
                }
            };
            return newState;
        case DELETE_FOLLOW:
            newState = {
                ...state,
                followings: {
                    ...state.followings,
                }
            };
            delete newState.followings[action.payload.id];
            return newState;
        case DELETE_FOLLOWER:
            newState = {
                ...state,
                followers: {
                    ...state.followers,
                }
            };
            delete newState.followers[action.payload.id];
            return newState;
        default:
            return state;
    }
}
