// Service to Handle API Requests

import axios from 'axios';

const API_URL = `http://localhost:${process.env.BACKENDPORT}/api/menu`;

// Get all menu items
export const getAllMenuItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get menu items by category and type
export const getMenuItemsByCategoryType = async (category, type) => {
  const response = await axios.get(`${API_URL}/${category}/${type}`);
  return response.data;
};

// Add a new menu item
export const addMenuItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

// Update a menu item
export const updateMenuItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

// Delete a menu item
export const deleteMenuItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
