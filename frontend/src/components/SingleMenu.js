import React from 'react';
import '../stylesheets/customSingleItem.css';
import { NavLink } from 'react-router-dom';

const SingleMenu = ({ item }) => {
  
  return (
    <div className='col-md-4 mb-4'>
      <div className='card h-100 shadow-sm'>
        <div className='card-body'>
          <h3 className='card-title'>{item.name}</h3>
          <p className='card-text'>{item.description}</p>
          <h4 className='text-primary mb-3'>{item.price}</h4>
          <div className='d-grid'>
            <NavLink to={`/${item.category === 'food' ? 'food' : 'drinks'}/${item.category.toLowerCase()}/${item.id}`} className='btn btn-primary'>
              Read More
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMenu;
