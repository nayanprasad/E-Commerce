import React from "react";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ProductDetails from "./components/ProductDetails/ProductDetails";
import "./App.css";
import Products from "./components/Products/Products";
import Search from "./components/Search/Search";



export default function App() {
    return (
        <Router>
            <Header/>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route  path="/product/:id" element={<ProductDetails/>}/>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/search" element={<Search/>}/>
                <Route  path="/search/:keyword" element={<Products/>}/>
            </Routes>

            <Footer/>
        </Router>
    );
}
