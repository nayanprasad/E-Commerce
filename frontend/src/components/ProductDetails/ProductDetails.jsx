import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails, newReview} from "../../redux/actions/productAction";
import {ADD_NEW_REVIEW_RESET} from "../../redux/constants/productConstant"
import {clearErrors} from "../../redux/actions/userAction";
import {addToCart} from "../../redux/actions/cartAction";
import "./ProductDetails.css";
import ReviewCard from "../ReviewCard/ReviewCard";
import Loader from "../Loader/Loader";
import {toast} from "react-toastify";
import MetaDate from "../MetaDate";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(state => state.productDetails);
    const {success, error: reviewError} = useSelector(state => state.newReview);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitReview = () => {
        dispatch(newReview({productId: id, rating, comment}));
        setOpen(false);
    }

    useEffect(() => {
        dispatch(getProductDetails(id));
        if (error) {
            toast.error(error);
            // dispatch(clearErrors())
        }
        if (reviewError) {
            toast.error(reviewError);
            // dispatch(clearErrors())
        }
        if(success) {
            toast.success("Review Added")
            dispatch(getProductDetails(id));
            dispatch({type: "ADD_NEW_REVIEW_RESET"})
        }
    }, [dispatch, id, error, reviewError, success]);


    const option = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
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

    const handleAddToCart = () => {
        dispatch(addToCart(id, quantity));
        toast.success("Item added to cart")
    }



    if (loading)
        return <Loader/>


    return (
        <Fragment>

            <MetaDate title={product.name + " --Ecommerce"} />

            <div className="productDetails">
                <div className="carousel">
                    <Carousel>
                        {product?.images && product.images?.map((image) => (
                            <div className="carouselImage">
                                <img src={image?.url} alt={product.name}/>
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
                        <Rating {...option} />
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
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                        <p>
                            Status:{" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description: <p>{product.description}</p>
                    </div>
                    <button onClick={handleClickOpen} className="submitReview">Submit Review</button>

                    <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Submit Review"}
                            </DialogTitle>
                            <DialogContent>
                                <div className={"reviewSubmitBox"}>
                                    <Rating
                                        onChange={(e) => setRating(e.target.value)}
                                        value={rating}
                                        size="large"
                                    />
                                    <textarea
                                        className="submitDialogTextArea"
                                        cols="30"
                                        rows="5"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmitReview} autoFocus color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

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
