import React from 'react'; // { useEffect, useState }
import { NavLink, useLoaderData } from 'react-router-dom'; // useParams,
import axios from 'axios';
// import Spinner from './Spinner';
import { FaArrowLeft, FaDollarSign } from 'react-icons/fa';
import '../stylesheets/customMenu.css';

const MenuDetails = () => {
  // const { id } = useParams(); 
  const menu = useLoaderData();
  if (!menu) {
    return <div>Menu item not found.</div>;
  }

  return (
    <div className="container icon-container">
      <section className="row">
        <div className="col-12 back-button-wrapper">
          <NavLink to="/food" className="back-to-menu">
            <FaArrowLeft className="icon-left" /> Back to Menu
          </NavLink>
        </div>
      </section>
      <div className="row">
        <div className="col-12">
          <h1>{menu.name}</h1>
          <p>{menu.description}</p>
          <span className='price-wrapper'>
            <FaDollarSign className='dollar'/> {menu.price}
          </span>
        </div>
      </div>
    </div>
  );
}

// This was done so fetching menu based on id can be used as a component
const menuLoader = async({ params }) => {
  // console.log("Params", params);
  try{
    const response = await axios.get(`/api/v1/menu/${params.id}`); // fetching menu based on id. It uses proxy in package.json.
    // console.log("Response", response);
    return response.data.menuItem;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Response('Error fetching menu item', { status: 404 });
  }
}

export { MenuDetails as default, menuLoader };
