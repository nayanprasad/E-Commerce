import React, {Fragment, useEffect} from 'react';
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaDate from "../MetaDate";
import { useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../redux/actions/productAction";
import {toast } from 'react-toastify';
import Loader from "../Loader/Loader";
import testImg from "../../assets/images/micromaxInB.jpg"


// const product = {
//     id: 1,
//     name: "Iphone 12",
//     price: 1000,
//     numReviews: 10,
//     image: testImg,
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//     ratings: 4.5,
//     numOfReviews: 10
// }


const Home = () => {

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {

        dispatch(listProducts);
    }, [dispatch]);

    if(error)
        toast.error(error)

    if(loading) return <Loader/>

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
                {products && products.map((product) => (
                    <Product key={product._id} product={product}/>
                ))}
            </div>

        </Fragment>

    );
};

export default Home;
