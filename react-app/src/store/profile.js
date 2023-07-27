const SET_USER = "profile/SET_USER";

const initialState = { user: null, lists: null };

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const getUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
		return ["An error occurred. Please try again."];
    }
};

export default function profileReducer(state = initialState, action) {
    let newState;
	switch (action.type) {
		case SET_USER:
            const normalizedLists = action.payload.lists.reduce((result, listObj) => {
                result[listObj.id] = listObj;
                return result;
            }, {});
            newState = { ...state, user: action.payload, lists: normalizedLists };
            return newState;
		default:
			return state;
	}
}
