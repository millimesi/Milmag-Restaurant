import React, { useState, useContext } from 'react'; // , useEffect, useRef
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom'; // useParams,
import axios from 'axios';
import { FaDollarSign, FaPlusCircle, FaMinusCircle, } from 'react-icons/fa'; //FaArrowLeft,
import '../stylesheets/customMenuDetails.css';
import { cartContext } from '../context/context.jsx';
import '../stylesheets/errorSuccess.css';
import { ToastContainer, toast } from 'react-toastify';

const MenuDetails = () => {
  const menu = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  // Access cart state from context
  const { state: cartItems, dispatch } = useContext(cartContext);

  // Check if item is in cart and set initial quantity accordingly
  const cartItem = cartItems.find(item => item.id === menu.id);
  const [quantity, setquantity] = useState(cartItem ? cartItem.quantity : 0);

  if (!menu) {
    return <div>Menu item not found.</div>;
  }

  const incrementQuantity = () => setquantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 0) setquantity(quantity - 1);
  };

  // Check if menu.image is defined and construct the image path
  const getImagePath = (imagePath) => {
    try {
      return require(`../assets/images/${menu.imagePath}.jpeg`);
    } catch (error) {
      console.error('Image not found:', error);
      return null; // Return null if the image cannot be loaded
    }
  }

  const menuImagePath = getImagePath(menu.imagePath);

  // Navigate back to the previous menu category if available, otherwise go to '/food'
  const handleBackClick = () => {
    const previousCategory = location.state?.from || "/food";
    navigate(previousCategory);
  };

  // Add item to cart with validation
  const handleAddToCart = () => {
    if (quantity < 1) {
      toast.error("Please indicate a quantity before adding to cart");
      return;
    } else {
      // Dispatch ADD action with the selected quantity
      dispatch({
        type: "ADD",
        payload: { item: menu, quantity },
      });
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true}/>
      <div className="container icon-container">
        {/* <section className="row">
          <div className="col-12 back-button-wrapper">
            <button onClick={handleBackClick} className="btn btn-outline-light back-to-menu">
              <FaArrowLeft className="icon-left" /> Back to Menu
            </button>
          </div>
        </section> */}
        <h1 className='mb-5 text-center menuName'>{menu.name}</h1>
        <div className='row'>
          <div className='col-sm-6 mb-5'>
              {menuImagePath ? (
                <img src={menuImagePath} className="mx-auto d-block rounded" alt={menu.name} width="450" height="400"/>
              ) : (
                <div>No image available</div> // Placeholder if image is not available
              )}
          </div>
          <div className='col-sm-6'>
            <div className="">
                <p className='fs-4 text-start mb-3'> <strong>Description: </strong> {menu.fulldescription}</p>
            </div>
            <div className="text-start fs-4 list-inline">
              <p><strong>Dietary Information: </strong> {menu.dietary_info || 'No dietary information available.'}</p>
            </div>
            <div className='text-start'> <strong className='fs-4 pe-2'>Price:</strong>
              <span className='fs-4 p-0 m-0'>
                <FaDollarSign className='fs-4 dollar p-0 m-0'/> {menu.price}
              </span>
            </div>
            <div className='text-center my-3'>
              <div className='d-flex justify-content-center align-items-center mt-5'>
                <FaMinusCircle className='mx-2 minusPlus' onClick={decrementQuantity}/>
                <span className='mx-2 quantityValue'>{quantity}</span>
                <FaPlusCircle className='mx-2 minusPlus' onClick={incrementQuantity}/>
              </div>
            </div>

            <div className='d-flex justify-content-center align-items-center mt-4'>
              <button className='quantityButton mx-3' onClick={handleBackClick}><strong>CANCEL</strong></button>
              <button className='quantityButton mx-3' onClick={handleAddToCart}><strong>ADD TO CART</strong></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// This was done so fetching menu based on id can be used as a component
const menuLoader = async({ params }) => {
  try{
    const response = await axios.get(`/api/v1/menu/${params.id}`); // fetching menu based on id. It uses proxy in package.json.
    return response.data.menuItem;
  } catch (error) {
    // console.error('Error fetching menu:', error);
    throw new Response('Error fetching menu item', { status: 404 });
  }
}

export { MenuDetails as default, menuLoader };
