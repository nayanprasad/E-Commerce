import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILS } from "../../constants/productConstant";

export const listProduct = async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});

        const response = await axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/products"
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
