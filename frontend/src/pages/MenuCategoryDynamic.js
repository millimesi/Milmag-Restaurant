import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuCategory from '../components/MenuCategory';
import MenuDetails from '../components/MenuDetails';
import axios from 'axios';
import Spinner from '../components/Spinner';

const MenuCategoryDynamic = () => {
  const { subcategory, id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async() => {
      try {
        // const response = await axios.get('/api/v1/menu/'); // fetching all the menu. It uses proxy in package.json.
        const response = await axios.get(`/api/v1/menu/subcategory/${subcategory}`)
        setMenu(response.data.menuItems);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    if (subcategory) {
      fetchMenu();
    }
  }, [subcategory]);

  // Display a loading state while data is being fetched
  if (loading) {
    return <Spinner loading={loading} />;
  }

  // Display error message if there was an error
  if (error) {
    return <h2>{error}</h2>;
  }

  // Check if subcategory is defined before calling toLowerCase
  if (!subcategory) {
    return <h2>Subcategory not specified</h2>;
  }

  const validSubcategories = {
    food: ['burger', 'pizza', 'salad', 'kids'],
    drinks: ['softdrinks', 'juice', 'coffee', 'milkshakes']
  };

  // Filter items based on the selected category. Determine if the category is valid and get the appropriate subcategories
  let items = [];
  if (validSubcategories.food.includes(subcategory.toLowerCase())) {
    items = menu.filter(item => item.subcategory.toLowerCase() === subcategory.toLowerCase());
  } else if (validSubcategories.drinks.includes(subcategory.toLowerCase())) {
    items = menu.filter(item => item.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  // If an id is provided, find the specific item
  if (id) {
    const selectedItem = menu.find(item => item.id === id);
    // console.log("Selescted Item: ", selectedItem);
    
    // If the item is found, render its details
    if (selectedItem) {
      return <MenuDetails item={selectedItem} />;
    }
    
    // If no item matches the id
    return <h2>Menu not found</h2>;
  }
  
  // Invalid category
  if (items.length === 0) {
    return <h2>Category not found</h2>;
  }

  return <MenuCategory items={items} />;
};

export default MenuCategoryDynamic;
