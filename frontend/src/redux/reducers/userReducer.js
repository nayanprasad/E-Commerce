import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILS,
} from "../constants/userConstant";


export const userReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case  LOGIN_FAILS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        default:
            return state
    }
}
