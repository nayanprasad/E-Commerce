import React, {Fragment} from 'react';
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaDate from "../MetaDate";

import testImg from "../../assets/images/micromaxInB.jpg"

const product = {
    id: 1,
    name: "Iphone 12",
    price: 1000,
    numReviews: 10,
    image: testImg,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
}

const Home = () => {
    return (
        <Fragment>
            
            <MetaDate title={"Ecommerce"} />

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div  id="container" className="container">
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
            </div>

        </Fragment>

    );
};

export default Home;
