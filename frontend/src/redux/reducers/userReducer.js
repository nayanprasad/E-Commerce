import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILS,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_FAILS,
    CLEAR_ERRORS
} from "../constants/userConstant";


export const userLoginReducer = (state = {user: {}}, action) => {
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
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
        default:
            return state
    }
}

export const userSignUpReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case  SIGNUP_FAILS:
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

