import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILS,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILS,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAILS,
    LOGOUT_SUCCESS,
    LOGOUT_FAILS,
    CLEAR_ERRORS
} from "../constants/userConstant";


export const userReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
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
        case LOAD_USER_FAILS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case LOGOUT_FAILS:
            return {
                ...state,
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
