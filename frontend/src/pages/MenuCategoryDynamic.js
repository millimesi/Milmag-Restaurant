import React from 'react';
import { useParams } from 'react-router-dom';
import MenuCategory from '../components/MenuCategory';
import menuItems from '../jsonFiles/menuItems.json';
import MenuDetails from '../components/MenuDetails';

const MenuCategoryDynamic = () => {
  const { category, id } = useParams();

  // Filter items based on the selected category
  const items = menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());

  // If an id is provided, find the specific item
  if (id) {
    const selectedItem = menuItems.find(item => item.id === parseInt(id));
    
    // If the item is found, render its details
    if (selectedItem) {
      return <MenuDetails item={selectedItem} />;
    }
    
    // If no item matches the id
    return <h2>Item not found</h2>;
  }

  // Invalid category
  if (items.length === 0) {
    return <h2>Category not found</h2>;
  }

  return <MenuCategory items={items} />;
};

export default MenuCategoryDynamic;

