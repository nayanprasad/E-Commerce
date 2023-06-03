import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer, productListReducer} from "./reducers/productReducer";
import {userReducer} from "./reducers/userReducer"


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    user: userReducerReducer
});

const initialState = {}

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    // applyMiddleware(thunk)
);

export default store;
