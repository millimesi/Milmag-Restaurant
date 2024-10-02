// Menu controller functions

import Menu from "../models/menuModel.js";

// Add a new menu item
export const addMenu = async (req, res) => {
  try {
    const { category, subcategory, name, description, price, imagePath } = req.body;
    const menuItem = await Menu.create({ category, subcategory, name, description, price, imagePath });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add menu item', error: error.message });
  }
};

// Edit an existing menu item
export const editMenu = async (req, res) => {
  const { id } = req.params;
  const { category, subcategory, name, description, price, imagePath } = req.body;

  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.update({ category, subcategory, name, description, price, imagePath });
    res.status(200).json(menuItem);
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
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
};

// Get menu items by category
export const getMenuByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const menuItems = await Menu.findAll({ where: { category } });
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category' });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
};

// Get menu items by category and subcategory
export const getMenuByCategoryAndSubcategory = async (req, res) => {
  const { category, subcategory } = req.params;

  try {
    const menuItems = await Menu.findAll({ where: { category, subcategory } });
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category and subcategory' });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
};

// Get a menu item by ID
export const getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await Menu.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu item', error: error.message });
  }
};
