import React, {Fragment, useState, useEffect, useRef} from 'react';
import "./Payment.css";
import Payment from "./Payment";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import {BASE_URL} from "../../redux/constants";
import axios from "axios";


const PaymentWrapper = () => {

    const [stripeApiKey, setStripeApiKey] = useState('')

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
    }

    useEffect(() => {
        getStripeApiKey()
    }, [])


    return (
        <Fragment>
            <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment/>
            </Elements>
        </Fragment>
    );
};

export default PaymentWrapper;
