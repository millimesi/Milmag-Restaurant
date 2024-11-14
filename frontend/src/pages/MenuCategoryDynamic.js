import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuCategory from '../pages/MenuCategory';
import MenuDetails from '../pages/MenuDetails';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../stylesheets/errorSuccess.css';

const MenuCategoryDynamic = () => {
  const { subcategory, id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async() => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/menu/subcategory/${subcategory}`); // fetching menu based on subcategory. It uses proxy in package.json.

        // Check if the response data is as expected
        if (response.data.menuItems.length === 0) {
          setError('No items found in this subcategory.');
          setMenu([]); // Set menu to empty array
        } else {
          // console.log("Response Data MenuItems: ", response.data.menuItems);
          setMenu(response.data.menuItems);
          setError(null); // Clear error if data is present
        }
      } catch (error) {
        console.error('Fetch error in subcategory:', error);
        if (error.response && error.response.status === 404) {
          // Handle 404 and other errors
          setError(`No items found for this subcategory ${subcategory}.`); // Custom message for 404
          setMenu([]); // Set menu to empty array
        } else {
          setError(`Error fetching data in subcategory: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }

    if (subcategory) {
      fetchMenu();
    }
  }, [subcategory, id]);

  // Display a loading state while data is being fetched
  if (loading) {
    return <Spinner loading={loading} />;
  }

  // Display error message if there was an error
  if (error) {
    return <h2 className='error-message'>{error}</h2>;
  }

  // {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
