const express = require('express');
const authRouter = require('./auth');
const taskRouter = require('./task');
const commentRouter = require('./comments');
const notificationRouter = require('./notifications');
const userRouter = require('./users');
const googleRouter = require('./loginWIthGoogle');
const imageRouter = require('./images');
const auth = require('../middleware/authentication');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/auth', googleRouter);
v1Router.use('/tasks', taskRouter);
v1Router.use('/notifications', auth, notificationRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/users', auth, userRouter);
v1Router.use('/images', imageRouter);

module.exports = v1Router;
