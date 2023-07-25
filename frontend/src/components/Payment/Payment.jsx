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
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";


const Payment = () => {

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
        console.log(data)
        setStripeApiKey(data.stripeApiKey)
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

                <div className="wrapperContainerPayment">
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">Payment details</div>
                        </div>
                        <div className="form-container">
                            <div className="form-inner">
                                <form className="signup">
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
                                        <input type="submit" value="Confirm Order"/>
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




