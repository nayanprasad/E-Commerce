import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "../../redux/actions/productAction";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";

const ProductDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    console.log(product);

    const option = {
        size: window.innerHeight < 600 ? 20 : 25,
        value: product.ratings,
        edit: false,
        activeColor: "tomato",
        color: "rgba(0,0,0,0.2)",
        isHalf: true
    };


    return (
        <div className="productDetails">
            <div className="carousel">
                <Carousel>
                    {product.images && product.images.map((image) => (
                        <div className="carouselImage">
                            <img src={image.url} alt={product.name}/>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...option} />
                    <span> ({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>₹{product.price}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input value="1" type="number"/>
                            <button>+</button>
                        </div>
                        {" "}
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status:{""}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                </div>

                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>
                <button className="submitReview">Submit Review</button>
            </div>

        </div>

    )
};

export default ProductDetails;
