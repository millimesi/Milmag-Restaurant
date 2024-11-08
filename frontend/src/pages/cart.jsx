// import React from 'react';
// import "../stylesheets/Cart.css";
// import { useContext, useState } from 'react';
// import { cartContext } from '../context/context.jsx';
// import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
// import NavBar from '../components/Navbar.jsx';

// const Cart = () => {
//   // Access cart state from context
//   // const { state: cartItems } = useContext(cartContext);

//   const globalState = useContext(cartContext);
//   const state = globalState.state;
//   console.log("State", state);
//   // Check if item is in cart and set initial quantity accordingly
//   const cartItem = cartItems.find(item => item.id === cartItems.id);
//   const [quantity, setquantity] = useState(cartItem ? cartItem.quantity : 0);

//   const incrementQuantity = () => setquantity(quantity + 1);
//   const decrementQuantity = () => {
//     if (quantity > 0) setquantity(quantity - 1)
//   };

//   return (
//     <>
//       <NavBar />
//       <h2>Cart Details</h2>
//       <div className='d-flex flex-column'>
//         {cartItems.map((item, index) => {
//           // console.log("Item in Cart: ", item);

//           // Check if item.imagePath is defined and construct the image path
//           const getImagePath = (imagePath) => {
//             try {
//               return require(`../assets/images/${item.imagePath}.jpeg`);
//             } catch (error) {
//               console.error('Image not found:', error);
//               return null; // Return null if the image cannot be loaded
//             }
//           }

//           const cartImagePath = getImagePath(item.imagePath);

//           return (
//             <div className='d-md-flex flex-md-grow-1' key={index}>
//               {cartImagePath ? (
//                 <img src={cartImagePath} className="" alt={item.name} width="40" height="50"/>
//               ) : (
//                 <div>No image available</div> // Placeholder if image is not available
//               )}
//               <p>{item.name}</p>
//               <p>{item.quantity}</p>
//               <p>{item.quantity*item.price}</p>
//               <div className=''>
//                 <FaMinusCircle className='' onClick={decrementQuantity}/>
//                 <span className=''>{item.quantity}</span>
//                 <FaPlusCircle className='' onClick={incrementQuantity}/>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </>
//   )
// }

// export default Cart;

import React, { useContext, useState } from 'react';
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

  return (
    <>
      <NavBar />
      <h2 className='cart-details'>Cart Details</h2>
      {/* <div className='cart-header'>
        <span>Image</span>
        <span>Name</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <div className='cart-container'>
        {cartItems.map((item, index) => {
          const cartImagePath = getImagePath(item.imagePath);

          return (
            <div className='cart-item' key={item.id}>
              {cartImagePath ? (
                <img src={cartImagePath} alt={item.name} />
              ) : (
                <div>No image available</div>
              )}
              <div className='cart-item-content'>
                <p>{item.name}</p>
                <div className='quantity-controls'>
                  <FaMinusCircle onClick={() => decrementQuantity(item)} />
                  <span className=''>{item.quantity}</span>
                  <FaPlusCircle onClick={() => incrementQuantity(item)} />
                </div>
                <p>{item.price}</p>
                <p>{item.quantity * item.price}</p>
              </div>
            </div>
          );
        })}
      </div> */}

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

      <table className="cart-table2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Fee</td>
          </tr>
          <tr>
            <td>Delivery Fee</td>
          </tr>
          <tr>
            <td>Tax</td>
          </tr>
          <tr>
            <td>Discount</td>
          </tr>
          <tr>
            <td>Billing Fee</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Cart;
