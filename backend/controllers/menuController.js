// Menu controller functions
import Menu from "../models/menuModel.js";

// Category
const categoryArray = ['food', 'drinks'];
const validSubcategories = {
  food: ['burger', 'pizza', 'salad', 'kids'],
  drinks: ['softdrinks', 'juice', 'coffee', 'milkshakes']
};

// Image Path Validation
const validImagePathPattern = /^[a-zA-Z0-9]+$/;

// Add a new menu item
export const addMenu = async (req, res) => {
  try {
    const { category, subcategory, name, description, price, imagePath, fulldescription, dietary_info } = req.body;
    // console.log("Request body: ", req.body);

    if (!(category && subcategory && name && description && price && imagePath && fulldescription && dietary_info)) {
      return res.status(400).json({ message: "All fields(category, subcategory, name, description, price, imagePath, fulldescription, dietary_info) are compulsory"});
    }

    if (!categoryArray.includes(category)) {
      return res.status(404).json({ message: 'Category is either food or drinks' });
    }

    if (category === 'food') {
      if (!validSubcategories.food.includes(subcategory.toLowerCase())) {
        return res.status(404).json({ message: 'Subcategory for food is either burger, pizza, salad or kids' });
      }
    } else if (category === 'drinks') {
        if (!validSubcategories.drinks.includes(subcategory.toLowerCase())) {
        return res.status(404).json({ message: 'Subcategory for drinks is either softdrinks, juice, coffee, or milkshakes' });
      }
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({ message: 'Name must be between 3 and 50 characters' });
    }

    if (description.length < 10 || description.length > 300) {
      return res.status(400).json({ message: 'Description must be between 10 and 300 characters' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Price must be a valid number greater than 0' });
    }

    // Validation for image paths
    if (!validImagePathPattern.test(imagePath)) {
      return res.status(400).json({ message: 'Image path must contain only alphanumeric characters' });
    }

    if (fulldescription.length < 10 || fulldescription.length > 500) {
      return res.status(400).json({ message: 'Full description must be between 10 and 500 characters' });
    }

    if (dietary_info.length < 3 || dietary_info.length > 300) {
      return res.status(400).json({ message: 'Dietary information must be between 3 and 300 characters' });
    }

    // Check if the menu item name is unique
    const existingMenuItem = await Menu.findOne({ where: { name } });
    if (existingMenuItem) {
      return res.status(400).json({ message: 'A menu item with this name already exists' });
    }

    const menuItem = await Menu.create({ category, subcategory, name, description, price, imagePath, fulldescription, dietary_info });
    res.status(201).json({message: 'Menu item added successfully', menuItem});
  } catch (error) {
    console.log("Failed to add menu item", error);
    res.status(500).json({ message: 'Failed to add menu item', error: error.message });
  }
};

// Edit an existing menu item
export const editMenu = async (req, res) => {
  const { id } = req.params;
  const { category, subcategory, name, description, price, imagePath, fulldescription, dietary_info } = req.body;

  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Category validation
    let categoryToCheck = category || menuItem.category;
    console.log(categoryToCheck);
    if (category && !categoryArray.includes(category)) {
      return res.status(404).json({ message: 'Category is either food or drinks' });
    }

    // Subcategory validation
    if (subcategory) {
      if (categoryToCheck === 'food') {
        if (!validSubcategories.food.includes(subcategory.toLowerCase())) {
          return res.status(404).json({ message: 'Subcategory for food is either burger, pizza, salad or kids' });
        }
      } else if (categoryToCheck === 'drinks') {
        if (!validSubcategories.drinks.includes(subcategory.toLowerCase()))
          return res.status(404).json({ message: 'Subcategory for drinks is either softdrinks, juice, coffee, or milkshakes' });
        }
      }

    // Name Validation
    if (name) {
      if (name.length < 3 || name.length > 50) {
        return res.status(400).json({ message: 'Name must be between 3 and 50 characters' });
      }
    }

    // Description Validation
    if (description) {
      if (description.length < 10 || description.length > 300) {
        return res.status(400).json({ message: 'Description must be between 10 and 300 characters' });
      }
    }

    // Price Validation
    if (price) {
      if (price <= 0) {
        return res.status(404).json({ message: 'Price cannot be lesser than zero' });
      }
    }

    // Image Path
    if (imagePath) {
      if (!(validImagePathPattern.test(imagePath))) {
        return res.status(400).json({ message: 'Image path must contain only alphanumeric characters' });
      }
    }

    // Full Description
    if (fulldescription) {
      if (fulldescription.length < 10 || fulldescription.length > 500) {
        return res.status(400).json({ message: 'Full description must be between 10 and 500 characters' });
      }
    }

    // Dietary_info
    if (dietary_info) {
      if (dietary_info.length < 3 || dietary_info.length > 300) {
        return res.status(400).json({ message: 'Dietary information must be between 3 and 300 characters' });
      }
    }

    // Update the menu item
    await menuItem.update({ category, subcategory, name, description, price, imagePath, fulldescription, dietary_info });
    res.status(200).json({message: 'Menu item edited successfully', menuItem});
  } catch (error) {
    res.status(500).json({ message: 'Failed to edit menu item', error: error.message });
  }
};

// Delete a menu item
export const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.destroy();
    res.status(204).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu item', error: error.message });
  }
};

// Get all menu items
export const getAllMenu = async (req, res) => {
  try {
    const menuItems = await Menu.findAll();
    res.status(200).json({message: 'All Menus', menuItems});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
};

// Get menu items by category
export const getMenuByCategory = async (req, res) => {
  const { category } = req.params;

  // Validates category
  if (!categoryArray.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const menuItems = await Menu.findAll({ where: { category } });
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category' });
    }
    res.status(200).json({message: 'Menu by Category', menuItems});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
};

// Get menu items by category and subcategory
export const getMenuBySubcategory = async (req, res) => {
  // const { category, subcategory } = req.params;
  const { subcategory } = req.params;

  // Validate subcategory
  if (!validSubcategories.food.includes(subcategory.toLowerCase()) && !validSubcategories.drinks.includes(subcategory.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid subcategory' });
  }

  try {
    // const menuItems = await Menu.findAll({ where: { category, subcategory } });
    const menuItems = await Menu.findAll({ where: { subcategory: subcategory.toLowerCase() } });
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category and subcategory' });
    }
    res.status(200).json({message: 'Menu by subcategory', menuItems});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
};

// Get a menu item by ID
export const getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await Menu.findByPk(id);
    console.log("MenuItem", menuItem);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({message: 'Menu by Id', menuItem});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu item', error: error.message });
  }
};
