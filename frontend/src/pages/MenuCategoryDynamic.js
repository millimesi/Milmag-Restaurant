import React from 'react';
import { useParams } from 'react-router-dom';
import MenuCategory from '../components/MenuCategory';
import menuItems from '../jsonFiles/menuItems.json';

const MenuCategoryDynamic = () => {
  const { category } = useParams();

  // Filter items based on the selected category
  const items = menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());

  // Invalid category
  if (items.length === 0) {
    return <h2>Category not found</h2>;
  }

  return <MenuCategory items={items} />; // title={category.toUpperCase()}
};

export default MenuCategoryDynamic;

