import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer,
    productListReducer,
    newReviewReducer,
    adminProductReducer,
    adminProductDeleteReducer,
    newProductReducer,
    productEditReducer
} from "./reducers/productReducer";
import {userReducer,
    updateProfileReducer,
    adminUsersReducer,
    adminUserDeleteReducer,
    adminUserDetailsReducer,
    adminUserUpdateReducer
} from "./reducers/userReducer"
import {cartReducer} from "./reducers/cartReducer";
import {orderReducer,
    myOrdersReducers,
    orderDetailsReducer,
    adminOrdersReducer,
    adminOrderDeleteReducer,
    adminOrderDetailsReducer
} from "./reducers/orderReducer";


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    updateProfile: updateProfileReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducers,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    adminProducts: adminProductReducer,
    adminNewProduct: newProductReducer,
    adminProductDelete:adminProductDeleteReducer,
    adminProductEdit: productEditReducer,
    adminOrders: adminOrdersReducer,
    adminOrderDelete:adminOrderDeleteReducer,
    adminOrderDetails: adminOrderDetailsReducer,
    adminUsers: adminUsersReducer,
    adminUserDelete: adminUserDeleteReducer,
    adminUserDetails: adminUserDetailsReducer,
    adminUserUpdate: adminUserUpdateReducer,
});

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingDetails: localStorage.getItem("shippingDetails")
            ? JSON.parse(localStorage.getItem("shippingDetails"))
            : {},
    }
}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    // applyMiddleware(thunk)
);

export default store;
