const express = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');
const taskRouter = require('./task');
const auth = require('../middleware/authentication');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);
v1Router.use('/tasks', taskRouter);

module.exports = v1Router;
