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
import {loadStripe} from '@stripe/stripe-js';
import {BASE_URL} from "../../redux/constants";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";
import Loader from "../Loader/Loader";


const Payment = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {shippingDetails, cartItems} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)

    const [stripeApiKey, setStripeApiKey] = useState('')
    const [loading, setLoading] = useState(true)
    const [finalPrice, setFinalPrice] = useState(0)



    const getStripeApiKey = async () => {
        console.log("getStripeApiKey")
        const {data} = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/stripeapi`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setStripeApiKey(data.stripeApiKey)
        setLoading(false)
    }

    useEffect(() => {
        const totalPrice = cartItems.reduce((price, item) => price + item.price * item.quantity, 0);
        const shippingPrice = totalPrice > 100 ? 0 : 100
        const taxPrice = (totalPrice * 0.18).toFixed(2)
        const finalPrice = (totalPrice + shippingPrice + Number(taxPrice)).toFixed(2)
        setFinalPrice(finalPrice)

        getStripeApiKey()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

    }

    return (
        <Fragment>
            <Elements stripe={loadStripe(stripeApiKey)}>
                <div className="stepperContainer">
                    <Stepper activeStep={2}/>
                </div>
                {loading && <Loader />}
                <div className="wrapperContainerPayment">
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">Payment details</div>
                        </div>
                        <div className="form-container">
                            <div className="form-inner">
                                <form className="signup" onSubmit={handleSubmit}>
                                    <div className="field flex">
                                        <CreditCardIcon/>
                                        <div className=" payment__details__item">
                                            <CardNumberElement/>
                                        </div>
                                    </div>
                                    <div className="field flex">
                                        <EventIcon/>
                                        <div className=" payment__details__item">
                                            <CardExpiryElement/>
                                        </div>
                                    </div>
                                    <div className="field flex">
                                        <VpnKeyIcon/>
                                        <div className=" payment__details__item">
                                            <CardCvcElement/>
                                        </div>
                                    </div>
                                    <div className="field btn">
                                        <div className="btn-layer"></div>
                                        <input type="submit" value={`Pay ₹${finalPrice}`}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Elements>
        </Fragment>
    );
};

export default Payment;




