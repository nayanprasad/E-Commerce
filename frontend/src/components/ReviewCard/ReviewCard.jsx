import React from 'react';
import ProfileImg from "../../assets/images/profile.svg";
import "./ReviewCard.css"
import Rating from '@mui/material/Rating';

const ReviewCard = ({review}) => {

    const option = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className="reviewCard">
            <div>
                <img src={ProfileImg} alt={review.name}/>
            </div>
            <div>
                <p>{review.name}</p>
                <Rating {...option} />
                <spanp>{review.comment}</spanp>
            </div>
        </div>
    );
};

export default ReviewCard;
