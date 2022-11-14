import ACTIONS from "../actions/auth";
const initialState = {
    user: null,
    isLoggedIn: false
};

const authReducer = function (prevState = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOGIN: {
            return {
                ...prevState,
                user: action.user,
                isLoggedIn: true
            }
        }
        case ACTIONS.LOGOUT: {
            return {
                ...prevState,
                user: null,
                isLoggedIn: false
            }
        }
        default: {
            return prevState
        }

    }
};

export default authReducer;