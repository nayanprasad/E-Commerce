import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    return (
        <Fragment>
            <div className="orderSuccessContainer">
                <div className="animation-ctn">
                    <div className="icon icon--order-success svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
                            <g fill="none" stroke="#22AE73" strokeWidth="2">
                                <circle cx="77" cy="77" r="72" style={{ strokeDasharray: '480px', strokeDashoffset: '960px' }}></circle>
                                <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style={{ strokeDasharray: '480px', strokeDashoffset: '960px' }}></circle>
                                <polyline className="st0" stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4" style={{ strokeDasharray: '100px 100px', strokeDashoffset: '200px' }} />
                            </g>
                        </svg>

                    </div>
                </div>
                <div className="orderSuccess">
                    <h1>Order Success</h1>
                    <p>Your order has been placed successfully.</p>
                    <p>Thanks for shopping with us.</p>
                    <div className={"orderSuccessBtns"}>
                        <Link to={"/"}> <button>Go to Home</button></Link>
                        <Link to={"/orders/me"}><button>Go to Orders</button></Link>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default OrderSuccess;

// css

// Compare this snippet from frontend/src/components/OrderSuccess/OrderSuccess.jsx:

