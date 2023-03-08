const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// @desc    Register new user
// @route   POST /v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(400);
    throw new BadRequestError('Please add all fields');
  }
});

// @desc    Authenticate a user
// @route   POST /v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new BadRequestError('Please add all fields');
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(400);
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isCorrect = await user.comparePassword(password);

  if (!isCorrect) {
    res.status(400);
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(201).json({ user, token });
});
const forgotPassword = asyncHandler(async (req, res) => {});
const resetPassword = asyncHandler(async (req, res) => {});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
