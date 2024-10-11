// src/components/MenuCategory.js
import React from 'react';
import SingleItem from './SingleItem'; // This will be your generic item component

const MenuCategory = ({ title, items }) => {
  return (
    <section className='px-2 py-3'>
      <div className='container'>
        <h2 className='text-center text-primary mb-4'>{title}</h2>
        <div className='row'>
          {items.map((item) => (
            <SingleItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCategory;
