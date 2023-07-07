import {ADD_TO_CART, REMOVE_FROM_CART} from "../constants/cartConstants";
import axios from "axios";
import {BASE_URL} from "../constants";
export const addToCart = (id, quantity) =>  async (dispatch, getState) => {

    const {data} = await axios.get(`${BASE_URL}/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    const { cartItems } = getState().cart;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {

        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        })

        const { cartItems } = getState().cart;

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

