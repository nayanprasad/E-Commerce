import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILS,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILS,
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


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

