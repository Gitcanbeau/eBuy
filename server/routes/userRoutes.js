import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { protectRoute, admin } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

const genToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401).send('Invalid Email or Password');
    throw new Error('This user is not found.');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send('This email address has been registered.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send('Failed to register.');
    throw new Error('Something went wrong.');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('This user cannot be found.');
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No Orders can be found.');
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404);
    throw new Error('This user cannot be found.');
  }
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/:id/profile').put(protectRoute, updateUserProfile);
userRoutes.route('/:id/orders').get(protectRoute, getUserOrders);
userRoutes.route('/admin/getAllUsers').get(protectRoute, admin, getUsers);
userRoutes.route('/admin/deleteUser/:userId').delete(protectRoute, admin, deleteUser);

export default userRoutes;
