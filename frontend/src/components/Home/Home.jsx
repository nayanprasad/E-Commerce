import React, {Fragment, useEffect} from 'react';
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaDate from "../MetaDate";
import { useDispatch, useSelector} from "react-redux";
import {listProduct} from "../../redux/actions/productAction";

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

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProduct);

    }, [dispatch]);


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
