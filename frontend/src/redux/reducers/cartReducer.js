import {ADD_TO_CART} from "../constants/cartConstants";


export const cartReducer = (state = {cartItem : []}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItem.find((i) => i.product === item.product);

            if(isItemExist) {
                return {
                    ...state,
                    cartItem: state.cartItem.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                };
            }
            else {
                return {
                    ...state,
                    cartItem: [...state.cartItem, item],
                };
            }

        default:
            return state
    }
}
