import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "../../redux/actions/productAction";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import ReviewCard from "../ReviewCard/ReviewCard";
import Loader from "../Loader/Loader";
import {toast} from "react-toastify";
import MetaDate from "../MetaDate";
import {clearErrors} from "../../redux/actions/userAction";

const ProductDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(state => state.productDetails);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            toast.error(error);
            // dispatch(clearErrors())
        }


    }, [dispatch, id, error]);


    const option = {
        size: window.innerHeight < 600 ? 20 : 25,
        value: product.ratings,
        edit: false,
        activeColor: "tomato",
        color: "rgba(0,0,0,0.2)",
        isHalf: true
    };

    const increaseProductQuantity = () => {
        if (quantity < product?.stock) {
            setQuantity(quantity + 1);
        }
    }

    const decreaseProductQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }



    if (loading)
        return <Loader/>


    return (
        <Fragment>

            <MetaDate title={product.name + " --Ecommerce"} />

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
                                <button onClick={decreaseProductQuantity}>-</button>
                                <input readOnly value={quantity} type="number"/>
                                <button onClick={increaseProductQuantity}>+</button>
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

            <div className="reviewContainer">
                <h3 className="reviewHeading">REVIEWS</h3>

                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews.map((review) => (
                            <div className="review">
                                <ReviewCard review={review}/>

                            </div>
                        ))}
                    </div>
                ) : (
                    <h3 className="noReview">No Reviews</h3>
                )}
            </div>


        </Fragment>
    )
};

export default ProductDetails;
