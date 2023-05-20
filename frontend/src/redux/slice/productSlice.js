import {createSlice } from "@reduxjs/toolkit";

// import {
//     PRODUCT_LIST_REQUEST,
//     PRODUCT_LIST_SUCCESS,
//     PRODUCT_LIST_FAILS
// } from "../../constants/productConstant";

const initialState = {
    loading: false,
    products: [],
    error: null
}

const produceSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        PRODUCT_LIST_REQUEST : (state, action) => {
            state.loading = true;
            state.products = [];
        },
        PRODUCT_LIST_SUCCESS : (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        PRODUCT_LIST_FAILS : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILS } = produceSlice.actions;
export default produceSlice.reducer


