import React, { useContext } from 'react';
import NavBar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { cartContext } from '../context/context';
import "../stylesheets/cartCheckout.css";

const CartCheckout = () => {
  const { state: cartItems } = useContext(cartContext);

  // Total Menu Fee of Item
  const menuFee = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  // Total Amount
  const totalAmount = menuFee; // TO BE REVIEWED.

  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <h2 className='cartCheckoutDetails'>BILL SUMMARY</h2>

      {/* Option for Takeout or Delivery
      If Takeout {
        delivery fee === $34.50
      } else if (delivery) {
        Input address
        if (address) {
          delivery fee === $34.5
        }
      } */}

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
                <td>$0.00</td>
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
    </>
  )
}

export default CartCheckout;
