import express from 'express';
import {
  addMenu,
  editMenu,
  deleteMenu,
  getAllMenu,
  getMenuByCategory,
  getMenuByCategoryAndSubcategory,
  getMenuById
} from '../controllers/menuController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Routes for menu
router.post('/', authenticate, addMenu);
router.put('/:id', authenticate, editMenu);
router.delete('/:id', authenticate, deleteMenu);
router.get('/', authenticate, getAllMenu);
router.get('/category/:category', authenticate, getMenuByCategory);
router.get('/category/:category/subcategory/:subcategory', authenticate, getMenuByCategoryAndSubcategory);
router.get('/:id', authenticate, getMenuById);

export default router;
