import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILS,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILS,
    CLEAR_ERRORS
} from "../constants/userConstant";


export const userReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case  LOGIN_FAILS:
        case REGISTER_FAILS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
        default:
            return state
    }
}
