import React, {Fragment, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import "./ConfirmOrder.css";
import Stepper from "../Stepper/Stepper";
import {useSelector} from "react-redux";

const ConfirmOrder = () => {

    const navigate = useNavigate()
    const {shippingDetails, cartItems} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)

    const totalPrice = cartItems.reduce((price, item) => price + item.price * item.quantity, 0);
    const shippingPrice = totalPrice > 100 ? 0 : 100
    const taxPrice = (totalPrice * 0.18).toFixed(2)
    const finalPrice = (totalPrice + shippingPrice + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    return (
        <Fragment>
            <div className="stepperContainer">
                <Stepper activeStep={1}/>
            </div>
            <div className="confimOrderContainer">
                <div className="confirmOrder">
                    <h1>Confirm Order</h1>
                    <div className="confirmOrder__top">
                        <div className="confirmOrder__left">
                            <h3>Your Cart Items</h3>
                            {cartItems.map(item => (
                                <div className="confirmOrder__item">
                                    <img src={item.image} alt={item.name}/>
                                    <div className="cartItemDetails">
                                        <p><span style={{fontWeight: "500"}}>Name:</span> {item.name}</p>
                                        <p><span
                                            style={{fontWeight: "500"}}>Price:</span> ₹{item.price} * {item.quantity} = <b>₹{item.price * item.quantity}</b>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="confirmOrder__right">
                            <h3>Order Summary</h3>
                            <div className="confirmOrder__summary">
                                <div className="confirmOrder__summary__item">
                                    <p>Items</p>
                                    <p>Shipping</p>
                                    <p>Tax</p>
                                    <p>Total</p>
                                </div>
                                <div className="confirmOrder__summary__item">
                                    <p>: ₹ {totalPrice}</p>
                                    <p>: ₹ {shippingPrice}</p>
                                    <p>: ₹ {taxPrice}</p>
                                    <p>: ₹ {finalPrice}</p>
                                </div>
                            </div>
                            <button onClick={() => navigate("/order/payment")}>Proceed for Payment</button>
                        </div>
                    </div>
                    <div className="confirmOrder__bottom">
                        <h3>Shipping Details</h3>
                        <div className="confirmOrder__shippingDetails">
                            <div className="confirmOrder__shippingDetails__left">
                                <p><span style={{fontWeight: "550"}}>Name:</span> {user.name}</p>
                                <p><span style={{fontWeight: "550"}}>Phone:</span> {shippingDetails.phone}</p>
                                <p><span
                                    style={{fontWeight: "550"}}>Address:</span> {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.postalCode}, {shippingDetails.state}, {shippingDetails.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default ConfirmOrder;


