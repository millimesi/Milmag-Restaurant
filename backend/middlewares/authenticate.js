// File to authenticate users and admins

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization Header Missing!!!' });
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication Token Missing!!!' });
        }

        const decoded = jwt.verify(token, process.env.JWTSECRET); // Verify the token
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or Expired token' });
        }

        const user = await User.findOne({ where: { email: decoded.email } }); // Find user by email
        if (!user) {
            throw new Error('User not found!!!');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired. Please log in again.' });
        }
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
}
