import {ADD_TO_CART, REMOVE_FROM_CART, SHIPPING_DETAILS, CLEAR_CART} from "../constants/cartConstants";


export const cartReducer = (state = {cartItems : [], shippingDetails: {}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            const item = action.payload;

            const isItemExist = state.cartItems.find((i) => i.product === item.product);

            if(isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                };
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

            case REMOVE_FROM_CART:
                return {
                    ...state,
                    cartItems: state.cartItems.filter((i) => i.product !== action.payload),
                }

            case CLEAR_CART:
                return {
                    ...state,
                    cartItems: [],
                }

            case SHIPPING_DETAILS:
                return {
                    ...state,
                    shippingDetails: action.payload,
                }

        default:
            return state
    }
}
