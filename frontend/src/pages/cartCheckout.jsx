import React, { useContext, useState } from 'react';
import NavBar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { cartContext } from '../context/context';
import "../stylesheets/cartCheckout.css";
// import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const CartCheckout = () => {
  const { state: cartItems } = useContext(cartContext);
  const [ deliveryOption, setDeliveryOption ] = useState("takeout");
  const [ address, setAddress ] = useState("");
  // const navigate = useNavigate();

  // Total Menu Fee of Item
  const menuFee = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  // DeliveryFee
  const deliveryFee = (deliveryOption === "delivery" ? 20 : 0);

  // Total Amount
  const totalAmount = menuFee + deliveryFee; // TO BE REVIEWED.

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleStripePayment = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

      const body = { products: cartItems };
      // console.log("Body in stripePayments", body);

      const token = localStorage.getItem('token');
      // console.log("Token in stripePayment", token);
      // console.log("LocalStorage in stripepayment:", localStorage);
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      localStorage.setItem("cart", JSON.stringify(body));

      const response = await fetch(`/api/v1/payments/paymentSession`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      // console.log("Response in stripePayment", response);

      // Handle error in case the response is not successful
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
        // toast.error("Failed to create checkout session");
      }

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  }

  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <h2 className='cartCheckoutDetails'>BILL SUMMARY</h2>

      <div className="deliveryOptionTitle">DELIVERY OPTION</div>
      <div className="deliveryOption">
        <label htmlFor="deliveryOption">
          <input
            className="deliveryOptionInput"
            type="radio"
            name="deliveryOption"
            value="takeout"
            checked={deliveryOption === "takeout"}
            onChange={() => setDeliveryOption("takeout")}
          />
          Takeout
        </label>

        <div className="deliveryInputWrapper">
          <label htmlFor="deliveryOption">
          <input
            className="deliveryOptionInput"
            type="radio"
            name="deliveryOption"
            value="delivery"
            checked={deliveryOption === "delivery"}
            onChange={() => setDeliveryOption("delivery")}
          />
            Delivery
          </label>

          {/* If delivery is selected, show address input */}
          {deliveryOption === "delivery" && (
            <div className="deliveryAddress">
              <label htmlFor="">
                <input
                  className="addressInput"
                  type="text"
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
          )}
         </div>
      </div>

      <div className='summary-title'>Details</div>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Menu Fee</td>
              <td>${menuFee.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery Fee</td>
              <td>${deliveryFee.toFixed(2)} </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>Total Fee</td>
              <td>${totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <button className='cartCheckoutButton' onClick={handleStripePayment}><strong>PAY ${totalAmount.toFixed(2)}</strong></button>
            {/* <button className='cartCheckoutButton' onClick={() => navigate("/payment") }><strong>PAY ${totalAmount.toFixed(2)}</strong></button> */}
        </div>

        {/* <div className="paymentDetailsContainer">
          <div className="paymentDetails">Payment Details</div>
        </div> */}
    </>
  )
}

export default CartCheckout;
