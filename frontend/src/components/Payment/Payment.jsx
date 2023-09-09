import React, {Fragment, useState, useEffect, useRef} from 'react';
import "./Payment.css";
import Stepper from "../Stepper/Stepper";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Loader from "../Loader/Loader";
import axios from "axios";
import {BASE_URL} from "../../redux/constants";
import {toast} from "react-toastify";
import {createOrder} from "../../redux/actions/orderAction";
import {clearCart} from "../../redux/actions/cartAction";


const Payment = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {shippingDetails, cartItems} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    const {error} = useSelector(state => state.newOrder)

    const [isPaying, setIsPaying] = useState(false)


    const stripe = useStripe();
    const elements = useElements();
    const payButton = useRef(null)

    const totalPrice = cartItems.reduce((price, item) => price + item.price * item.quantity, 0);
    const shippingPrice = totalPrice > 100 ? 0 : 100
    const taxPrice = (totalPrice * 0.18).toFixed(2)
    const finalPrice = (totalPrice + shippingPrice + Number(taxPrice)).toFixed(2)


    useEffect(() => {

        if(error){
            toast.error(error)
            navigate("/order/payment")
        }


    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPaying(true)
        payButton.current.disabled = true

        try {
            const {data} = await axios({
                method: "POST",
                url: `${BASE_URL}/api/v1/payment/process`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    amount: Math.round(finalPrice * 100)
                }
            });

            const clientSecret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingDetails.address,
                            city: shippingDetails.city,
                            state: shippingDetails.state,
                            postal_code: shippingDetails.pinCode,
                            // country: shippingDetails.country
                        }
                    }
                }
            })

            if (result.error) {
                setIsPaying(false)
                payButton.current.disabled = false
                toast.error(result.error.message)
            } else if (result.paymentIntent.status === "succeeded") {
                dispatch(createOrder({
                    orderItems: cartItems,
                    shippingAddress: shippingDetails,
                    paymentMethod: "Card",
                    itemsPrice: totalPrice,
                    taxPrice: taxPrice,
                    shippingPrice: shippingPrice,
                    totalPrice: finalPrice,
                    paymentResult: {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                }))
                dispatch(clearCart())
                toast("Payment Successfull")
                navigate("/order/success")
            } else {
                setIsPaying(false)
                payButton.current.disabled = false
                toast.error("Something went wrong")
            }
        } catch (e) {
            payButton.current.disabled = false
            console.log(e.response.data.message)
            toast.error(e.response.data.message)
        }
    }

    return (
        <Fragment>
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
                                    <input ref={payButton} type="submit" value={isPaying ? "Processingad..." : `Pay ₹${finalPrice}`}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;




