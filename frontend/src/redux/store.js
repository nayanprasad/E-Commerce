import {configureStore} from "@reduxjs/toolkit";
import ProductReducer from "./slice/productSlice";

export const store = configureStore({
    reducer: {
        product: ProductReducer

    }
});
