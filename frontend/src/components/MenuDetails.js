import React from 'react'; // { useEffect, useState }
import { NavLink, useLoaderData } from 'react-router-dom'; // useParams,
import axios from 'axios';
// import Spinner from './Spinner';
import { FaArrowLeft, FaDollarSign } from 'react-icons/fa';
import '../stylesheets/customMenuDetails.css';

const MenuDetails = () => {
  // const { id } = useParams(); 
  const menu = useLoaderData();
  // console.log("Menu", menu);
  if (!menu) {
    return <div>Menu item not found.</div>;
  }

  // Check if menu.image is defined and construct the image path
  // menu.imagePath ? require(`../assets/images/${menu.imagePath}.jpeg`) : null;
  const getImagePath = (imagePath) => {
    try {
      return require(`../assets/images/${menu.imagePath}.jpeg`);
    } catch (error) {
      console.error('Image not found:', error);
      return null; // Return null if the image cannot be loaded
    }
  }

  const menuImagePath = getImagePath(menu.imagePath);

  return (
    <div className="container icon-container">
      <section className="row">
        <div className="col-12 back-button-wrapper">
          <NavLink to="/food" className="back-to-menu">
            <FaArrowLeft className="icon-left" /> Back to Menu
          </NavLink>
        </div>
      </section>
      <h1 className='mb-3 menuName'>{menu.name}</h1>
      <div className='row'>
        <div className='col-4'>
          {/* <img src={require(`../assets/images/${menu.imagePath}.jpeg`)} class="rounded" alt="Classic Beef Burger" width="450" height="400"/> */}
          {menuImagePath ? (
            <img src={menuImagePath} className="rounded" alt={menu.name} width="450" height="400"/>
          ) : (
            <div>No image available</div> // Placeholder if image is not available
          )}
        </div>
        <div className="col-8 ">
          <p className='mb-3'> <strong>Description:</strong> {menu.fulldescription}</p>
        </div>
        <div className="mb-4">
          <h5>Dietary Information:</h5>
          <p>{menu.dietary_info || 'No dietary information available.'}</p>
        </div>
          <span className='price-wrapper'>
            <FaDollarSign className='dollar'/> {menu.price}
          </span>
      </div>
    </div>
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
