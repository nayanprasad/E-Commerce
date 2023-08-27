import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILS,
    CLEAR_ERRORS,
    ADD_NEW_REVIEW_REQUEST,
    ADD_NEW_REVIEW_SUCCESS,
    ADD_NEW_REVIEW_FAILS,
    ADD_NEW_REVIEW_RESET,
    ADMIN_PRODUCT_LIST_REQUEST,
    ADMIN_PRODUCT_LIST_SUCCESS,
    ADMIN_PRODUCT_LIST_FAILS,
} from "../constants/productConstant";


export const productListReducer = (state = {loading: true, products: []}, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                productCount: action.payload.productsCount,
                products: action.payload.products,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case PRODUCT_LIST_FAILS:
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
};



export const productDetailsReducer = (state = {loading: true, product : {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAILS:
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


export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case ADD_NEW_REVIEW_FAILS:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
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


export const adminProductReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ADMIN_PRODUCT_LIST_REQUEST:
            return {
                loading: true
            }
        case ADMIN_PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ADMIN_PRODUCT_LIST_FAILS:
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


