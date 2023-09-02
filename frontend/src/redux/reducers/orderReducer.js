import {
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,
    ADMIN_ORDER_DELETE_REQUEST,
    ADMIN_ORDER_DELETE_FAILS,
    ADMIN_ORDER_DELETE_RESET,
    ADMIN_ORDER_DELETE_SUCCESS,
    ADMIN_ORDER_DETAILS_REQUEST,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_FAIL,
    ADMIN_ORDER_DETAILS_RESET,
    ADMIN_ORDER_UPDATE_REQUEST,
    ADMIN_ORDER_UPDATE_SUCCESS,
    ADMIN_ORDER_UPDATE_FAILS,
    ADMIN_ORDER_UPDATE_RESET
} from '../constants/orderConstants'


export const orderReducer = (state = {order: []}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
                order: []
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case CREATE_ORDER_FAIL:
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
            return state;
    }
}

export const myOrdersReducers = (state = {orders : []}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case MY_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case ORDER_DETAILS_FAIL:
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
            return state;
    }
}

export const adminOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case ADMIN_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case ADMIN_ORDERS_FAIL:
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
            return state;
    }
}


export const adminOrderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_DELETE_REQUEST:
            return {
                loading: true
            }
        case ADMIN_ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        case ADMIN_ORDER_DELETE_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_ORDER_DELETE_RESET:
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

export const adminOrderDetailsReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ADMIN_ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_ORDER_DETAILS_RESET:
            return {
                ...state,
                order: {}
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

export const adminOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_UPDATE_REQUEST:
            return {
                loading: true
            }
        case ADMIN_ORDER_UPDATE_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        case ADMIN_ORDER_UPDATE_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_ORDER_UPDATE_RESET:
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
