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


export default function App() {
    return (
        <Router>
            <Header/>

            <Routes>
                <Route exact path="/" element={<Home/>}/>
            </Routes>

            <Footer/>
        </Router>
    );
}
