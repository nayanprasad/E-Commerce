import {
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
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
