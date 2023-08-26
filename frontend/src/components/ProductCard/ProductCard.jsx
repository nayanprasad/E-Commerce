import React from 'react';
import "./ProductCard.css";
import {Link} from "react-router-dom";
import Rating from '@mui/material/Rating';

const ProductCard = ({product}) => {

    const option = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
            <Link  className="ProductCard" to={`/product/${product._id}`} >
                <img  src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <Rating {...option} />
                    <span>{product.numOfReviews} Reviews</span>
                </div>
                <span className="price"> ₹{product.price} </span>
            </Link>
    );
};

export default ProductCard;
