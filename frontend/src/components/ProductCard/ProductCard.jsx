import React from 'react';
import "./ProductCard.css";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {

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
                <img  src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...option} />
                    <span>{product.numOfReviews} Reviews</span>
                </div>
                <span className="price"> ₹{product.price} </span>
            </Link>
    );
};

export default ProductCard;
