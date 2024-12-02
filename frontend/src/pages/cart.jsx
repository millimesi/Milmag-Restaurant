import React, { useContext } from 'react';
import { useConfirm } from 'material-ui-confirm';
import "../stylesheets/Cart.css";
import "../stylesheets/errorSuccess.css";
import { cartContext } from '../context/context.jsx';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import NavBar from '../components/Navbar.jsx';
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const { state: cartItems, dispatch } = useContext(cartContext);
  const navigate = useNavigate();
  const confirm = useConfirm();
  // const [ error, setError ] = useState(null);
  // const [ success, setSuccess ] = useState(null);

  // Functions to handle quantity updates, using `dispatch`
  const incrementQuantity = (item) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: item.id });
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch({ type: 'DECREMENT_QUANTITY', payload: item.id });
    }
  };

  const handleDelete = async(item) => {
    // console.log("Item", item);
    if (!item) {
      toast.error("Item is undefined");
      // setError("Item is undefined");
      // setTimeout(() => setError(null), 3000); // Clear error
      return;
    }

    // setSuccess(null);
    // setError(null);

    try {
      await confirm({
        title: "Delete Item?",
        description:`Are you sure you want to remove ${item.name} from your cart?`, // ${item.name}
        confirmationText: "Delete now",
        cancellationText: "Keep Item"
      });
      // If "Delete now" is clicked
      dispatch({ type:"DELETE_ITEM", payload:item.id }); // , payload:item.id

      // Show success message
      // setSuccess("Deleted successfully!");
      // setTimeout(() => setSuccess(""), 3000); // Clear message after 3 seconds

      // Display success toast
      // toast.success(`${item.name} deleted successfully!`);
      toast.success(`${item.name} deleted successfully!`);

    } catch (error) {
      if (error === "cancel") {
        console.log("User choose to keep Item");
      } else {
        console.log("Error in handleDelete: ", error);
        // toast.error("Something went wrong!");
      }
    }
  }

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
      <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true}/>
      <h2 className='cart-details'>Cart Details</h2>

      {/* Conditional rendering based on cartItems length */}
      {cartItems.length === 0 ? (
        <div className='emptyCart'>

          {/* Display error or success messages */}
          {/* {error && <div className="error-message">{error}</div>} */}
          {/* {success && <div className="success-message">{success}</div>} */}

          <FaCartShopping className='emptyCartIcon'/>
          <p className="emptyCartMessage">Your Cart is Empty</p>
          <p className="emptyCartSubtext">Add items to see them here!</p>
          <button className="emptyCartButton" onClick={() => navigate('/food')}>
            ADD ITEMS
          </button>
        </div>
      ) : (
        <>
          <table className="cart-table">

          {/* Display error or success messages */}
          {/* {error && <div className="error-message">{error}</div>} */}
          {/* {success && <div className="success-message">{success}</div>} */}

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
                      <MdDelete className='delete-cart' onClick={() => handleDelete(item)}/>
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
      )}
    </>
  );
};

export default Cart;
