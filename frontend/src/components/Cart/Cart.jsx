import React, {useState, useEffect, Fragment} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/actions/cartAction';
import './Cart.css';

const Cart = () => {

    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);

    const deleteCartItem = (id) => {
        dispatch(removeFromCart(id))
    }

    const increaseQuantity = (id, quantity, stock) => {
        if (quantity <= stock) {
            const newQuantity = quantity + 1;
            dispatch(addToCart(id, newQuantity))
        }
    }

    const decreaseQuantity = (id, quantity) => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            dispatch(addToCart(id, newQuantity))
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    if (cartItems.length === 0 || !cartItems) {
        return (
            <Fragment>
                <div className="emptyCart">
                    <ProductionQuantityLimitsIcon style={{fontSize: "100px"}}/>
                    <h2>No items in cart</h2>
                    <Link to={"/products"}>
                        <button>View Products</button>
                    </Link>
                </div>

            </Fragment>
        )
    }


    return (
        <Fragment>
            <div className="cart">
                <div className="cartHeader">
                    <h1>Products</h1>
                    <h1>Quantity</h1>
                    <h1>SubTotal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                </div>

                {cartItems?.map((item) => (
                    <>
                        <div className="cartItems">
                            <div className="cartItem">
                                <div className="cartItem__details">
                                    <img src={item.image} alt="image"/>
                                    <div className="cartItem__details__info">
                                        <p>{item.name}</p>
                                        <p>₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="cartItem__quantity">
                                    <div className="cartQuantity">
                                        <button
                                            onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-
                                        </button>
                                        <input readOnly value={item.quantity} type="number"/>
                                        <button
                                            onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+
                                        </button>
                                    </div>
                                </div>
                                <div className="cartItem__subtotal">
                                    ₹{item.price * item.quantity}

                                    <div onClick={() => deleteCartItem(item.product)} className="cartItem__remove">
                                        <DeleteIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <div className="cartTotal">
                <h1>Total&nbsp;</h1>
                <h1>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</h1>
            </div>

            <div className="cartButtons">
                <Link to={"/products"}>
                    <button>Continue Shopping</button>
                </Link>
                <Link to={"/login?redirect=shipping"}>
                    <button>Checkout</button>
                </Link>
            </div>

        </Fragment>
    );
};

export default Cart;
