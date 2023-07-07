import React,{useState, useEffect, Fragment} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../redux/actions/cartAction';
import './Cart.css';

const Cart = () => {

    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);

    useEffect(() => {

    }, [cartItems]);

    const deleteCartItem = (id) => {
        cartItems.filter((item) => item.product !== id);
    }

    const increaseQuantity = (id, quantity, stock) => {
        if(quantity <= stock) {
            const newQuantity = quantity + 1;
            dispatch(addToCart(id, newQuantity))
        }
    }

    const decreaseQuantity = (id, quantity) => {
        if(quantity > 0 ) {
            const newQuantity = quantity - 1;
            dispatch(addToCart(id, newQuantity))
        }
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
                                <img src="https://picsum.photos/seed/picsum/200/300" alt="hi"/>
                                <div className="cartItem__details__info">
                                    <p>{item.name}</p>
                                    <p>₹{item.price}</p>
                                </div>
                            </div>
                            <div className="cartItem__quantity">
                                <div className="cartQuantity">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                                    <input readOnly value={item.quantity} type="number"/>
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                            </div>
                            <div className="cartItem__subtotal">
                                ₹{item.price * item.quantity}

                                <div onClick={() => deleteCartItem(item.product)} className="cartItem__remove">
                                    <DeleteIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                ))}
            </div>

            <div  className="cartTotal">
                <h1>Cart Total&nbsp;</h1>
                <h1>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</h1>
            </div>

            <div className="cartButtons">
                <Link to={"/products"}><button>Continue Shopping</button></Link>
                <button>Checkout</button>
            </div>

        </Fragment>
    );
};

export default Cart;
