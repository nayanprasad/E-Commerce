import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ProductDetails from "./components/ProductDetails/ProductDetails";
import "./App.css";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import {useDispatch, useSelector} from "react-redux";
import {loadUser} from "./redux/actions/userAction";
import UserIcon from "./components/layouts/Header/UserIcon";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import Payment from "./components/Payment/PaymentWrapper";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import MyOrders from "./components/MyOrders/MyOrders";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ProductsList from "./components/Admin/ProductsList/ProductsList";
import OrdersList from "./components/Admin/OrdersList/OrdersList";
import UsersList from "./components/Admin/UsersList/UsersList";
import Create from "./components/Admin/Create/Create";


export default function App() {

    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector(state => state.user);


    useEffect(() => {
        dispatch(loadUser());
        console.log(process.env.REACT_APP_BASE_URL)
    }, [dispatch, toast]);


    return (
        <Router>
            <Header/>
            {isAuthenticated && <UserIcon user={user}/>}
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={true}
                theme="dark"
                limit={1}
                transition={Zoom}
            />

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/search" element={<Search/>}/>
                <Route path="/search/:keyword" element={<Products/>}/>
                <Route exact path="/login" element={<LoginSignup/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route exact path="/profile" element={<Profile/>}/>
                    <Route exact path="/profile/update" element={<UpdateProfile/>}/>
                    <Route exact path="/profile/changePassword" element={<UpdatePassword/>}/>
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/shipping" element={<Shipping/>}/>
                    <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>
                    <Route exact path="/order/payment" element={<Payment/>}/>
                    <Route exact path="/order/success" element={<OrderSuccess/>}/>
                    <Route exact path="/orders/me" element={<MyOrders/>}/>
                    <Route exact path="/order/:id" element={<OrderDetails/>}/>
                </Route>

                <Route element={<ProtectedRoute isAdmin={true}/>}>

                </Route>

                <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
                <Route exact path="/admin/products" element={<ProductsList/>}/>
                <Route exact path="/admin/orders" element={<OrdersList/>}/>
                <Route exact path="/admin/users" element={<UsersList/>}/>
                <Route exact path="/admin/product/create" element={<Create/>}/>



            </Routes>
            <Footer/>
        </Router>
    );
}
