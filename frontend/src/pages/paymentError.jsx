import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
// import { cartContext } from '../context/context';

const PaymentError = () => {
  // const state  = useContext(cartContext);
  const [cart, setCart] = useState([]);

  // Retrieve cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Storedcart in paymentError", storedCart);
    setCart(storedCart);
  }, []);

  // Calculate total quantity in the cart
  const totalItemQuantity = cart.length;
  console.log("Cart in paymentError", cart);
  console.log("Cart in length in paymentError", totalItemQuantity);

  return (
    <>
      <NavBar />
      <h1>Payment Canceled</h1>
      <p>You have canceled the payment process. Please try again later.</p>

      {/* Render Cart Items */}
      {cart.length > 0 ? (
        <div>
          <h2>Your Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <p>{item.name} - Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </>
  );
}

export default PaymentError;

