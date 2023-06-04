import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILS, CLEAR_ERRORS,
} from "../constants/productConstant";
import {BASE_URL} from"../constants"

export const listProducts = (keyword = "", page = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});

        let link = `${BASE_URL}/api/v1/products?keyword=${keyword}&page=${page}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`

        if(category) {
            console.log(category)
            link += `&category=${category}`
        }

        const response = await axios({
            method: "GET",
            url: link
        });

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: response.data
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAILS ,
            payload: err.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/product/${id}`
        });



        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: response.data.product
        });
    }
    catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAILS,
            payload: err.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
