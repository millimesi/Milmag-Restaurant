import React from 'react';
// import SingleItem from './SingleMenu';
import SingleMenu from './SingleMenu';

const MenuCategory = ({ title, items }) => {
  return (
    <section className='px-2 py-3'>
      <div className='container'>
        <h2 className='text-center text-primary mb-4'>{title}</h2>
        <div className='row'>
          {items.map((item) => (
            <SingleMenu key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCategory;
