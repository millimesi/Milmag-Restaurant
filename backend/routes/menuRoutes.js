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
// import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Routes for menu
router.post('/', addMenu);
router.put('/:id', editMenu);
router.delete('/:id', deleteMenu);
router.get('/', getAllMenu);
router.get('/category/:category', getMenuByCategory);
router.get('/category/:category/subcategory/:subcategory', getMenuByCategoryAndSubcategory);
router.get('/:id', getMenuById);

export default router;
