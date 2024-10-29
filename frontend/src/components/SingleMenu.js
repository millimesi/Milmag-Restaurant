import React, { useState } from 'react';
import '../stylesheets/customSingleItem.css';
import { NavLink } from 'react-router-dom';
import { FaPlusCircle, FaMinusCircle, FaDollarSign } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";

const SingleMenu = ({ item }) => {
  const [quantity, setquantity] = useState(1);

  const incrementQuantity = () => setquantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setquantity(quantity - 1)
  };

  // Check if menu.image is defined and construct the image path
  // menu.imagePath ? require(`../assets/images/${menu.imagePath}.jpeg`) : null;
  const getImagePath = (imagePath) => {
    try {
      return require(`../assets/images/${item.imagePath}.jpeg`);
    } catch (error) {
      console.error('Image not found:', error);
      return null; // Return null if the image cannot be loaded
    }
  }

  const menuImagePath = getImagePath(item.imagePath);
  
  return (
    <div className='col-md-4 mb-4'>
      <div className='card h-100 shadow-sm'>
        <div className='card-body'>
          <h3 className='text-center pb-3 card-title'>{item.name}</h3>
          <div className=''>
          {/* <img src={require(`../assets/images/${menu.imagePath}.jpeg`)} class="rounded" alt="Classic Beef Burger" width="450" height="400"/> */}
          {menuImagePath ? (
            <img src={menuImagePath} className="mx-auto d-block rounded" alt={item.name} width="200" height="150"/>
          ) : (
            <div>No image available</div> // Placeholder if image is not available
          )}
        </div>
          <p className='text-center pt-3 m-0 card-text'>{item.description}</p>
          <div className='text-center'>
            <div className='price p-0 mb-0 mt-2'> <FaDollarSign className='m-0 p-0 '/> {item.price}</div>
          </div>
          <div className='text-center my-3'>
            <div className='d-flex justify-content-center align-items-center'>
              <FaMinusCircle className='mx-2 plusMinus' onClick={decrementQuantity}/>
              <span className='mx-2'>{quantity}</span>
              <FaPlusCircle className='mx-2 plusMinus' onClick={incrementQuantity}/>
              {/* <button className='btn btn-primary mx-3'>Add to Cart</button> */}
              <FaCartShopping className='mx-3 shoppingCart'/>
            </div>
          </div>
          <div className='d-grid pb-1 col-4 mx-auto d-block'>
            {/* <NavLink to={`/${item.category === 'food' ? 'food' : 'drinks'}/${item.category.toLowerCase()}/${item.id}`} className='btn btn-primary'>
              Read More
            </NavLink> */}
            <NavLink
              to={`/${item.category === 'food' ? 'food' : 'drinks'}/${item.category.toLowerCase()}/${item.id}`}
              state={{ from: `/${item.category === 'food' ? 'food' : 'drinks'}/${item.subcategory.toLowerCase()}` }}
              className='btn btn-primary mt-2'
            >
              Read More
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMenu;
