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
            </Routes>

            <Footer/>
        </Router>
    );
}
