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
} from '../constants/orderConstants'
import axios from 'axios';
import {BASE_URL} from "../constants";


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const {data} = await axios({
            method: "POST",
            url: `${BASE_URL}/api/v1/order/new`,
            data: order,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDERS_REQUEST
        });

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/orders/me`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.myOrders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/order/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_ORDERS_REQUEST
        });

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/admin/orders`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        dispatch({
            type: ADMIN_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const adminDeleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({type: ADMIN_ORDER_DELETE_REQUEST});

        const {data} = await axios({
            method: "DELETE",
            url: `${BASE_URL}/api/v1/admin/order/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_ORDER_DELETE_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: ADMIN_ORDER_DELETE_FAILS,
            payload: e.response.data.message
        })
    }
}

export const getOrderDetailsAdmin = (id) => async (dispatch) => {
    try {

        dispatch({type: ADMIN_ORDER_DETAILS_REQUEST});

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/admin/order/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (e) {
        dispatch({
            type: ADMIN_ORDER_DETAILS_FAIL,
            payload: e.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
