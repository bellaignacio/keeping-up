import { REMOVE_USER } from "./session";

const SET_FOLLOWINGS_LISTS = "list/SET_FOLLOWINGS_LISTS";
const SET_PUBLIC_LISTS = "list/SET_PUBLIC_LISTS";
const SET_PROFILE_LISTS = "list/SET_PROFILE_LISTS";
const SET_CURRENT_LIST = "list/SET_CURRENT_LIST";
const UPDATE_LIST = "list/UPDATE_LIST";
const DELETE_LIST = "list/DELETE_LIST";

const initialState = {
    followings: {},
    public: {},
    profile: {},
    current: {}
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

const setCurrentList = (list) => ({
    type: SET_CURRENT_LIST,
    payload: list
});

const updateList = (list) => ({
    type: UPDATE_LIST,
    payload: list
});

const deleteList = (listId) => ({
    type: DELETE_LIST,
    payload: listId
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

export const getList = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const likeList = (listId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${listId}`, {
        method: "POST",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const unlikeList = (listId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${listId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const createComment = (listId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${listId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const editComment = (commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const createList = (formData) => async (dispatch) => {
    const response = await fetch("/api/lists/", {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentList(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const editList = (listId, title, caption, listItems, imgUrl, titleFont, titleSize, titleStyle, titleWeight, titleColor, titleAlign, liFont, liSize, liStyle, liWeight, liColor, liMarker, liCompStyle, liCompWeight, liCompColor, liCompDecor) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            caption,
            list_items: listItems,
            ...imgUrl != null && { image_url: imgUrl },
            ...titleFont != null && { title_font: titleFont },
            ...titleSize != null && { title_size: titleSize },
            ...titleStyle != null && { title_style: titleStyle },
            ...titleWeight != null && { title_weight: titleWeight },
            ...titleColor != null && { title_color: titleColor },
            ...titleAlign != null && { title_align: titleAlign },
            ...liFont != null && { li_font: liFont },
            ...liSize != null && { li_size: liSize },
            ...liStyle != null && { li_style: liStyle },
            ...liWeight != null && { li_weight: liWeight },
            ...liColor != null && { li_color: liColor },
            ...liMarker != null && { li_marker: liMarker },
            ...liCompStyle != null && { li_completed_style: liCompStyle },
            ...liCompWeight != null && { li_completed_weight: liCompWeight },
            ...liCompColor != null && { li_completed_color: liCompColor },
            ...liCompDecor != null && { li_completed_decoration: liCompDecor }
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentList(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const editListItem = (listItemId, description, isComplete) => async (dispatch) => {
    const response = await fetch(`/api/lists/items/${listItemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...description != null && { description },
            ...isComplete != null && { is_complete: isComplete }
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentList(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const removeList = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteList(listId));
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
        case REMOVE_USER:
            newState = { ...initialState };
            return newState;
        case SET_FOLLOWINGS_LISTS:
            newState = { ...state, followings: normalizeLists(action.payload) };
            return newState;
        case SET_PUBLIC_LISTS:
            newState = { ...state, public: normalizeLists(action.payload) };
            return newState;
        case SET_PROFILE_LISTS:
            newState = { ...state, profile: normalizeLists(action.payload) };
            return newState;
        case SET_CURRENT_LIST:
            newState = { ...state, current: action.payload };
            return newState;
        case UPDATE_LIST:
            newState = {
                ...state,
                followings: {
                    ...state.followings,
                    ...state.followings[action.payload.id] && { [action.payload.id]: action.payload }
                },
                public: {
                    ...state.public,
                    ...state.public[action.payload.id] && { [action.payload.id]: action.payload }
                },
                profile: {
                    ...state.profile,
                    ...state.profile[action.payload.id] && { [action.payload.id]: action.payload }
                },
                ...state.current.id === action.payload.id && { current: action.payload }
            };
            return newState;
        case DELETE_LIST:
            newState = { ...state };
            delete newState.profile[action.payload]
            newState.current = {};
            return newState;
        default:
            return state;
    }
}
