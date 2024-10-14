import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuDetails = ({ item }) => {
  return (
    <div className="container">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <h4 className="text-primary">{item.price}</h4>
      <NavLink to="/food" className='btn btn-primary'>Back to Menu</NavLink>
    </div>
  )
}

export default MenuDetails;
