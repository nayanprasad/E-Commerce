import React from "react";
import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    // Link,
    // Routes
} from "react-router-dom";
import Header from "./components/layouts/Header";


export default function App() {
    return (
        <Router>
            <div>
                <Header/>
                {/*<Routes>*/}
                {/*    <Route path="/" element={<Join getName={getName} showAlert={showAlert}/>}/>*/}
                {/*    <Route path="/chat" element={<Chat name={name}/>}/>*/}
                {/*</Routes>*/}
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Blogs() {
    return <h2>Blogs</h2>;
}

function NoPage() {
    return <h2>404</h2>;
}
