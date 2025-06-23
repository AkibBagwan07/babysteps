import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  const { name, email, password, pregnancyStartDate } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'This email is already registered. Please log in instead.' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pregnancyStartDate,
    });

    res.status(201).json({ msg: 'Registration successful. You can now log in.' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ msg: 'Something went wrong during registration. Please try again.' });
  }
};

// @desc    Authenticate user & return token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'No account found with that email.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Incorrect password. Please try again.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Respond with token and user info (excluding password)
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        pregnancyStartDate: user.pregnancyStartDate,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Login failed. Please try again later.' });
  }
};
