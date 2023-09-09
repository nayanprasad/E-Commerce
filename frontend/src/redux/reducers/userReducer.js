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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILS,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILS,
    UPDATE_PASSWORD_RESET,
    ADMIN_USERS_REQUEST,
    ADMIN_USERS_SUCCESS,
    ADMIN_USERS_FAILS,
    ADMIN_USER_DELETE_REQUEST,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_DELETE_FAILS,
    ADMIN_USER_DELETE_RESET,
    ADMIN_USER_DETAILS_REQUEST,
    ADMIN_USER_DETAILS_SUCCESS,
    ADMIN_USER_DETAILS_FAILS,
    ADMIN_USER_DETAILS_RESET,
    ADMIN_USER_UPDATE_REQUEST,
    ADMIN_USER_UPDATE_SUCCESS,
    ADMIN_USER_UPDATE_FAILS,
    ADMIN_USER_UPDATE_RESET,
    ADMIN_DASHBOARD_REQUEST,
    ADMIN_DASHBOARD_SUCCESS,
    ADMIN_DASHBOARD_FAILS,
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

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PROFILE_FAILS:
        case UPDATE_PASSWORD_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
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


export const adminUsersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ADMIN_USERS_REQUEST:
            return {
                loading: true
            }
        case ADMIN_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case ADMIN_USERS_FAILS:
            return {
                ...state,
                loading: false,
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


export const adminUserDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USER_DELETE_REQUEST:
            return {
                loading: true
            }
        case ADMIN_USER_DELETE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        case ADMIN_USER_DELETE_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_USER_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
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


export const adminUserDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case ADMIN_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case ADMIN_USER_DETAILS_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_USER_DETAILS_RESET:
            return {
                ...state,
                user: {}
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

export const adminUserUpdateReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case ADMIN_USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case ADMIN_USER_UPDATE_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_USER_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
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

export const adminDashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                dashboard: action.payload
            }
        case ADMIN_DASHBOARD_FAILS:
            return {
                ...state,
                loading: false,
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
