const express = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');
const taskRouter = require('./task');
const commentRouter = require('./comments');
const notificationRouter = require('./notifications');
const auth = require('../middleware/authentication');

const v1Router = express.Router();

v1Router.use('/auth', auth, authRouter);
v1Router.use('/products', productRouter);

v1Router.use('/tasks', taskRouter);
v1Router.use('/notifications', auth, notificationRouter);
v1Router.use('/comments', commentRouter);

module.exports = v1Router;
