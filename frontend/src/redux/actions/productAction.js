import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILS, CLEAR_ERRORS,
    ADD_NEW_REVIEW_REQUEST,
    ADD_NEW_REVIEW_SUCCESS,
    ADD_NEW_REVIEW_FAILS,
    ADMIN_PRODUCT_LIST_REQUEST,
    ADMIN_PRODUCT_LIST_SUCCESS,
    ADMIN_PRODUCT_LIST_FAILS,
    ADMIN_PRODUCT_DELETE_REQUEST,
    ADMIN_PRODUCT_DELETE_FAILS,
    ADMIN_PRODUCT_DELETE_RESET,
    ADMIN_PRODUCT_DELETE_SUCCESS,
    ADMIN_NEW_PRODUCT_REQUEST,
    ADMIN_NEW_PRODUCT_SUCCESS,
    ADMIN_NEW_PRODUCT_RESET,
    ADMIN_NEW_PRODUCT_FAIL,
    ADMIN_NEW_PRODUCT_EDIT_REQUEST,
    ADMIN_NEW_PRODUCT_EDIT_SUCCESS,
    ADMIN_NEW_PRODUCT_EDIT_RESET,
    ADMIN_NEW_PRODUCT_EDIT_FAIL
} from "../constants/productConstant";
import {BASE_URL} from"../constants"

export const listProducts = (keyword = "", page = 1, price = [0, 25000], category, ratings = 0, resultPerPage = 8 ) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});

        let link = `${BASE_URL}/api/v1/products?keyword=${keyword}&page=${page}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`

        if(category) {
            console.log(category)
            link += `&category=${category}`
        }

        if(resultPerPage !== 8) {
            link += `&resultPerPage=${resultPerPage}`
        }

        const response = await axios({
            method: "GET",
            url: link,
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


export const newReview = (reviewData) => async (dispatch) => {
    try{
        dispatch({type: ADD_NEW_REVIEW_REQUEST});

        console.log(reviewData)

        const response = await axios({
            method: "PUT",
            url: `${BASE_URL}/api/v1/review`,
            data: reviewData,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADD_NEW_REVIEW_SUCCESS,
            payload: response.data.success
        });
    }
    catch (err) {
        dispatch({
            type: ADD_NEW_REVIEW_FAILS,
            payload: err.response.data.message
        })
    }
}


export const getAdminPruducts = () => async (dispatch) => {
    try{
        dispatch({type: ADMIN_PRODUCT_LIST_REQUEST});

        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/admin/products`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_PRODUCT_LIST_SUCCESS,
            payload: response.data.products
        });
    }
    catch (err) {
        dispatch({
            type: ADMIN_PRODUCT_LIST_FAILS,
            payload: err.response.data.message
        })
    }
}



export const adminDeleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({type: ADMIN_PRODUCT_DELETE_REQUEST});

        const {data} = await axios({
            method: "DELETE",
            url: `${BASE_URL}/api/v1/admin/product/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_PRODUCT_DELETE_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: ADMIN_PRODUCT_DELETE_FAILS,
            payload: e.response.data.message
        })
    }
}


export const newProduct = (productData) => async (dispatch) => {
    try{
        dispatch({type: ADMIN_NEW_PRODUCT_REQUEST});

        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/api/v1/admin/product/new`,
            data: productData,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_NEW_PRODUCT_SUCCESS,
            payload: response.data
        });
    }
    catch (err) {
        dispatch({
            type: ADMIN_NEW_PRODUCT_FAIL,
            payload: err.response.data.message
        })
    }
}


export const updateProduct = (id, productData) => async (dispatch) => {
    try{
        dispatch({type: ADMIN_NEW_PRODUCT_EDIT_REQUEST});

        const response = await axios({
            method: "PUT",
            url: `${BASE_URL}/api/v1/admin/product/${id}`,
            data: productData,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch({
            type: ADMIN_NEW_PRODUCT_EDIT_SUCCESS,
            payload: response.data.success
        });
    }
    catch (err) {
        dispatch({
            type: ADMIN_NEW_PRODUCT_EDIT_FAIL,
            payload: err.response.data.message
        })
    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
