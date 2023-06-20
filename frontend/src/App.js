import React, {Fragment, useEffect} from "react";
import {
    BrowserRouter as Router,
    // Switch,
    Route,
    // Link,
    Routes
} from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import {ToastContainer, toast} from 'react-toastify';
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

export default function App() {

    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(loadUser())

    }, [dispatch, toast] );


    return (
        <Router>
            <Header/>
            {isAuthenticated && <UserIcon user={user}/>}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={true}
                theme="dark"
                limit={1}
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
                </Route>

            </Routes>

            <Footer/>

        </Router>
    );
}
