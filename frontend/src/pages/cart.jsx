import React, { useContext } from 'react';
import "../stylesheets/Cart.css";
import { cartContext } from '../context/context.jsx';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import NavBar from '../components/Navbar.jsx';

const Cart = () => {
  const { state: cartItems, dispatch } = useContext(cartContext);
  // const [ error, seterror ] = useState(null);

  // Functions to handle quantity updates, using `dispatch`
  const incrementQuantity = (item) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: item.id });
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch({ type: 'DECREMENT_QUANTITY', payload: item.id });
    }
  };

  // Helper function to construct image path
  const getImagePath = (imagePath) => {
    try {
      return require(`../assets/images/${imagePath}.jpeg`);
    } catch (error) {
      console.error('Image not found:', error);
      return null; // Return null if the image cannot be loaded
    }
  };

  // Total Menu Fee of Item
  const menuFee = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  // Total Amount
  const totalAmount = menuFee; // TO BE REVIEWED.

  return (
    <>
      <NavBar />
      <h2 className='cart-details'>Cart Details</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th> 
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const cartImagePath = getImagePath(item.imagePath);
            return (
              <tr key={item.id}>
                <td>
                  {cartImagePath ? (
                    <img src={cartImagePath} alt={item.name} /> // width="40" height="50"
                  ) : (
                    <span>No image available</span>
                  )}
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <div className='quantity-controls'>
                    <FaMinusCircle onClick={() => decrementQuantity(item)} />
                    <span>{item.quantity}</span>
                    <FaPlusCircle onClick={() => incrementQuantity(item)} />
                    <MdDelete className='delete-cart' onClick={() => dispatch({ type:"DELETE_ITEM", payload:item.id })}/>
                  </div>
                </td>
                <td>${item.quantity * item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='summary-title'>BILL SUMMARY</div>
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

      <div>
        <button className='checkoutButton'><strong>PROCEED TO CHECKOUT</strong></button>
      </div>
    </>
  );
};

export default Cart;
