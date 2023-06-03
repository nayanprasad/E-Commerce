import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILS,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_FAILS,
} from "../constants/userConstant";
import {CLEAR_ERRORS} from "../constants/productConstant";


export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({type: LOGIN_REQUEST});

        const {data} = await axios({
            method: "POST",
            url: "http://localhost:3000/api/v1/login",
            data: {
                email,
                password
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

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

        dispatch({type: SIGNUP_REQUEST})

        const {data} = await axios({
            method: "POST",
            data : userData,
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data.user
        })

    }catch (e) {
        dispatch({
            type: SIGNUP_FAILS,
            payload: e.response.data.message
        })
    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

