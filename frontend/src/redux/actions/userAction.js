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
    UPDATE_PROFILE_RESET,
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


    }catch (e) {
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


    }catch (e) {
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
        }catch (e) {
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

        dispatch({
            type: LOAD_USER_FAILS,
        });

    }catch (e) {
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

        }catch (e) {
            dispatch({
                type: UPDATE_PROFILE_FAILS,
                payload: e.response.data.message
            })
        }
}





export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

