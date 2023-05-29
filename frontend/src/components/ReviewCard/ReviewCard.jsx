import React from 'react';
import ReactStars from "react-rating-stars-component";
import ProfileImg from "../../assets/images/profile.svg";
import "./ReviewCard.css"

const ReviewCard = ({review}) => {

    const option = {
        size: window.innerHeight < 600 ? 20 : 25,
        value: review.rating,
        edit: false,
        activeColor: "tomato",
        color: "rgba(0,0,0,0.2)",
        isHalf: true
    };

    return (
        <div className="reviewCard">
            <div>
                <img src={ProfileImg} alt={review.name}/>
            </div>
            <div>
                <p>{review.name}</p>
                <ReactStars {...option} />
                <spanp>{review.comment}</spanp>
            </div>
        </div>
    );
};

export default ReviewCard;
