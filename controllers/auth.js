const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const { BadRequestError } = require('../errors');
// @desc Register a user
// @route POST /v1/auth/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const userAvailable = await UserModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }
  // // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new UserModel({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data us not valid');
  }
  // // await user.hashPassword();
  // await user.save();
  res.json({ message: 'Register the user' });
});

// @desc Login user
// @route POST /v1/auth/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new BadRequestError('Please provide email and password');
  }
  const user = await UserModel.findOne({ email });
  // compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: '15m' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
  }
});

// @desc Current user info
// @route POST /v1/auth/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
