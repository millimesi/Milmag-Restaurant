import express from 'express';
const router = express.Router();

import { register, login, allUsers, AUser, forgotPassword, resetPassword, resetPasswordToken } from '../controllers/userController.js';
// import { authenticate } from '../middlewares/authenticate.js';

router.post('/register', register); // Routes to register. POST http://localhost:8000/api/v1/users/register
router.post('/login', login); // Routes to login. POST http://localhost:8000/api/v1/users/login
router.get('/', allUsers); // Routes to get all users
router.get('/:email', AUser);
router.put('/forgotPassword', forgotPassword); // Routes to forgot Password. PUT http://localhost:8000/api/v1/users/forgotPassword Supply email in req.body
router.get('/resetPassword/:token', resetPasswordToken); // Route to redirect user to password reset form on the frontend
router.put('/resetPassword', resetPassword); // Routes to reset Password. You will be directed from email address. PUT http://localhost:8000/api/v1/users/resetPassword Supply newPassword, resetLink in req.body

export default router;
