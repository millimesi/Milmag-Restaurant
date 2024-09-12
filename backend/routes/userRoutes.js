import express from 'express';
const router = express.Router();

import { register, login } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

router.post('/register', register); // Routes to register. POST http://localhost:8000/api/v1/users/register
router.post('/login', login); // Routes to login. POST http://localhost:8000/api/v1/users/login

export default router;
