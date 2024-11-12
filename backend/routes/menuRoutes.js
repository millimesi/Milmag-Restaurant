import express from 'express';
import {
  addMenu,
  editMenu,
  deleteMenu,
  getAllMenu,
  getMenuByCategory,
  getMenuBySubcategory,
  getMenuById
} from '../controllers/menuController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Routes for menu
router.post('/', addMenu);
router.put('/:id', editMenu);
router.delete('/:id', deleteMenu);
router.get('/', getAllMenu);
router.get('/:id', getMenuById); // GET http://localhost:8080/api/v1/menu/
router.get('/category/:category', getMenuByCategory); // GET http://localhost:8080/api/v1/menu/category/food/burger (Should return menu items per category)
router.get('/subcategory/:subcategory', getMenuBySubcategory);

export default router;
