import React, {Fragment, useState, useEffect} from 'react';
import "./Payment.css";
import Stepper from "../Stepper/Stepper";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    useStripe,
    useElements,
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {loadStripe} from '@stripe/stripe-js';

const Payment = () => {

    const [stripeApiKey, setStripeApiKey] = useState('')

    const getStripeApiKey = async () => {
        fetch(`BASE_URL/api/v1/stripeapi`)
            .then(res => res.json())
            .then(data => {
                setStripeApiKey(data.stripeApiKey)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getStripeApiKey()
    }, [])

    return (
        <Fragment>
            <Elements stripe={loadStripe(stripeApiKey)}>
                <div className="stepperContainer">
                    <Stepper activeStep={2}/>
                </div>

                <div className="paymentContainer">
                    <div className="payment">
                        <h1>Payment</h1>
                        <div className="payment__top">
                            <div className="payment__left">
                                <h3>Payment Details</h3>
                                <div className="payment__details">
                                    <div className="payment__details__item">
                                        <CreditCardIcon/>
                                        <div className="payment__details__item__right">
                                            <h4>Card Number</h4>
                                            <CardNumberElement/>
                                        </div>
                                    </div>
                                    <div className="payment__details__item">
                                        <EventIcon/>
                                        <div className="payment__details__item__right">
                                            <h4>Expiry Date</h4>
                                            <CardExpiryElement/>
                                        </div>
                                    </div>
                                    <div className="payment__details__item">
                                        <VpnKeyIcon/>
                                        <div className="payment__details__item__right">
                                            <h4>CVC</h4>
                                            <CardCvcElement/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="payment__right">
                                <h3>Order Summary</h3>
                                <div className="payment__summary">
                                    <div className="payment__summary__item">
                                        <p>Items</p>
                                        <p>Shipping</p>
                                        <p>Tax</p>
                                        <p>Total</p>
                                    </div>
                                    <div className="payment__summary__item">
                                        <p>: ₹ 1000</p>
                                        <p>: ₹ 100</p>
                                        <p>: ₹ 180</p>
                                        <p>: ₹ 1280</p>
                                    </div>
                                </div>
                                <button>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Elements>
        </Fragment>
    );
};

export default Payment;




