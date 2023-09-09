import axios from "axios";
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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILS,
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
} from "../constants/userConstant";
import {CLEAR_ERRORS} from "../constants/productConstant";
import {BASE_URL} from "../constants";


export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({type: LOGIN_REQUEST});

        const {data} = await axios({
            method: "POST",
            url: `${BASE_URL}/api/v1/login`,
            data: {
                email,
                password
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        localStorage.setItem("token", data.token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })


    } catch (e) {
        dispatch({
            type: LOGIN_FAILS,
            payload: e.response.data.message
        })
    }
}
export const signup = (userData) => async (dispatch) => {

    try {
        dispatch({type: REGISTER_REQUEST});

        const {data} = await axios({
            method: "POST",
            url: `${BASE_URL}/api/v1/register`,
            data: userData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        localStorage.setItem("token", data.token);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })


    } catch (e) {
        dispatch({
            type: REGISTER_FAILS,
            payload: e.response.data.message
        })
    }
}


export const loadUser = () => async (dispatch) => {

    try {
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/me`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (e) {
        dispatch({
            type: LOAD_USER_FAILS,
            payload: e.response.data.message
        })
    }
};


export const logout = () => async (dispatch) => {
    try {

        await axios.get(`${BASE_URL}/api/v1/logout`);

        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");

        dispatch({
            type: LOAD_USER_FAILS,
        });

    } catch (e) {
        dispatch({
            type: LOAD_USER_FAILS,
            payload: e.response.data.message
        })
    }
}


export const updateProfile = (userData) => async (dispatch) => {

    try {

        dispatch({type: UPDATE_PROFILE_REQUEST});

        const {data} = await axios({
            method: "PUT",
            url: `${BASE_URL}/api/v1/me/update`,
            data: userData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })


    } catch (e) {
        dispatch({
            type: UPDATE_PROFILE_FAILS,
            payload: e.response.data.message
        })
    }
}


export const updatePassword = (passwords) => async (dispatch) => {

    try {

        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const {data} = await axios({
            method: "PUT",
            url: `${BASE_URL}/api/v1/password/update`,
            data: passwords,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

        localStorage.setItem("token", data.token);

    } catch (e) {
        dispatch({
            type: UPDATE_PASSWORD_FAILS,
            payload: e.response.data.message
        })
    }
}


export const getAdminUsers = () => async (dispatch) => {
    try {

        dispatch({type: ADMIN_USERS_REQUEST});

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/admin/users`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_USERS_SUCCESS,
            payload: data.users
        })

    } catch (e) {
        dispatch({
            type: ADMIN_USERS_FAILS,
            payload: e.response.data.message
        })
    }
}


export const adminDeleteUser = (id) => async (dispatch) => {
    try {

        dispatch({type: ADMIN_USER_DELETE_REQUEST});

        const {data} = await axios({
            method: "DELETE",
            url: `${BASE_URL}/api/v1/admin/user/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_USER_DELETE_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: ADMIN_USER_DELETE_FAILS,
            payload: e.response.data.message
        })
    }
}

export const adminGetUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({type: ADMIN_USER_DETAILS_REQUEST});

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/admin/user/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (e) {
        dispatch({
            type: ADMIN_USER_DETAILS_FAILS,
            payload: e.response.data.message
        })
    }
}

export const adminUpdateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({type: ADMIN_USER_UPDATE_REQUEST});

        const {data} = await axios({
            method: "PUT",
            url: `${BASE_URL}/api/v1/admin/user/${id}`,
            data: userData,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_USER_UPDATE_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: ADMIN_USER_UPDATE_FAILS,
            payload: e.response.data.message
        })
    }
}

export const getAdminDashboard = () => async (dispatch) => {
    try {

        dispatch({type: ADMIN_DASHBOARD_REQUEST});

        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/admin/dashboard`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_DASHBOARD_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ADMIN_DASHBOARD_FAILS,
            payload: e.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

