const express = require('express');
const productRouter = require('./product');
const authRouter = require('./auth');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);

module.exports = v1Router;
