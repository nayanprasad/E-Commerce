import React, {Fragment, useEffect} from 'react';
import "./EditOrder.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetailsAdmin, clearErrors} from "../../../redux/actions/orderAction";
import {ADMIN_ORDER_DETAILS_RESET, ADMIN_ORDER_UPDATE_RESET} from "../../../redux/constants/orderConstants";
import {toast} from "react-toastify";
import {Typography} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const ConfirmOrder = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error, order} = useSelector(state => state.adminOrderDetails)


    useEffect(() => {
        dispatch(getOrderDetailsAdmin(id))
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        // if (isUpdated) {
        //     toast.success("Updated successfully")
        //     navigate("/admin/orders");
        //     dispatch({type: ADMIN_ORDER_DETAILS_RESET})
        //     dispatch({type: ADMIN_ORDER_UPDATE_RESET})
        // }
    }, [id])

    return (
        <Fragment>
            <div className="createContainer">

                <div className="sidebarCreate">
                    <Sidebar/>
                </div>

                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Order #{order && order._id}
                        </Typography>
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>
                    {order.shippingAddress && order.shippingAddress.phone}
                  </span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>
                    {order.shippingAddress &&
                        `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pinCode}, ${order.shippingAddress.country}`}
                  </span>
                            </div>
                        </div>

                        <Typography>Orderd by</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>ID:</p>
                                <span>{order.user && order.user._id}</span>
                            </div>
                        </div>

                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentResult &&
                                        order.paymentResult.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.paymentResult &&
                                    order.paymentResult.status === "succeeded"
                                        ? "PAID"
                                        : "NOT PAID"}
                                </p>
                            </div>

                            <div>
                                <p>Amount:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>

                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            {/*<div>*/}
                            {/*    <p*/}
                            {/*        className={*/}
                            {/*            order.orderStatus && order.orderStatus === "Delivered"*/}
                            {/*                ? "greenColor"*/}
                            {/*                : "redColor"*/}
                            {/*        }*/}
                            {/*    >*/}
                            {/*        {order.orderStatus && order.orderStatus}*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                            <div className={`oderStatus`}>
                                <select style={{background: order.orderStatus === "Delivered" ? "green" : "orange"}}
                                        name="role" id="role">
                                    <option value="admin" selected={order.orderStatus === "Delivered"}>Delivered
                                    </option>
                                    {order.orderStatus !== "Delivered" &&
                                        <option value="user" selected={order.orderStatus === "Processing"}>Processing
                                        </option>}
                                </select>

                                {order.orderStatus !== "Delivered" && <button className="updateBtn">
                                    Update
                                </button>}
                            </div>


                        </div>
                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {order.orderItems &&
                                order.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product"/>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                        {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                      </span>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>

    );
};

export default ConfirmOrder;


