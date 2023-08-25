import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaDate"
import {Link, useParams} from "react-router-dom";
import {getOrderDetails} from "../../redux/actions/orderAction";
import Loader from "../Loader/Loader";
import {toast} from "react-toastify";
import { Typography } from '@mui/material';

const OrderDetails = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
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
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
