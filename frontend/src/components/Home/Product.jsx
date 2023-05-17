import React from 'react';
import "./Product.css";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const option = {
    size: window.innerHeight < 600 ? 20 : 25,
    value: 2.5,
    edit: false,
    activeColor: "tomato",
    color: "rgba(0,0,0,0.2)",
    isHalf: true

}

const Product = ({product}) => {

    return (
            <Link  className="ProductCard" to={`/product/${product._id}`} >
                <img  src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...option} />
                    <span>{product.numReviews} Reviews</span>
                </div>
                <span className="price"> ₹{product.price} </span>
            </Link>
    );
};

export default Product;
