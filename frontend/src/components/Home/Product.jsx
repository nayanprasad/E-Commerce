import React from 'react';
import "./Product.css";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({product}) => {

    const option = {
        size: window.innerHeight < 600 ? 20 : 25,
        value: product.ratings,
        edit: false,
        activeColor: "tomato",
        color: "rgba(0,0,0,0.2)",
        isHalf: true

    };

    return (
            <Link  className="ProductCard" to={`/product/${product._id}`} >
                <img  src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...option} />
                    <span>{product.numOfReviews} Reviews</span>
                </div>
                <span className="price"> ₹{product.price} </span>
            </Link>
    );
};

export default Product;
