import React,{useState, useEffect, Fragment} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import './Cart.css';

const Cart = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cartItems'));
        if (cart) {
            setCart(cart);
        }
        console.log(cart)
    }, []);



    return (
        <Fragment>
            <div className="cart">
                <div className="cartHeader">
                    <h1>Products</h1>
                    <h1>Quantity</h1>
                    <h1>SubTotal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                </div>

                {cart?.map((item) => (
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
                                <div className="detailsBlock-3-1-1">
                                    <button>-</button>
                                    <input readOnly value={item.quantity} type="number"/>
                                    <button>+</button>
                                </div>
                            </div>
                            <div className="cartItem__subtotal">
                                ₹{item.price * item.quantity}

                                <div className="cartItem__remove">
                                    <DeleteIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                ))}
            </div>

            <div  className="cartTotal">
                <h1>Cart Total&nbsp;</h1>
                <h1>₹{cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}</h1>
            </div>

            <div className="cartButtons">
                <Link to={"/products"}><button>Continue Shopping</button></Link>
                <button>Checkout</button>
            </div>


        </Fragment>
    );
};

export default Cart;
