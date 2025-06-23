import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes — only accessible with a valid JWT
export const protect = async (req, res, next) => {
  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer') && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token and attach user to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // exclude password

    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};
