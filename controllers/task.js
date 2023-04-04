// code start
const taskModel = require('../models/Task');
const userModel = require('../models/User');
const notificationService = require('../services/notificationService');

const getAllTasks = async (req, res) => {
  const tasks = await taskModel.find().exec();
  res.json(tasks);
};
const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findById(id).populate('create_user_id').exec();
  if (!task) {
    res.status(404).json({ error: 'task not found ' });
    return;
  }
  res.json(task);
};

/**
 * @openapi
 *
 * /addTask:
 *   post:
 *     summary: Add a new task
 *     description: Add a new task to the database
 *     tags:
 *      - task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */

const addTask = async (req, res) => {
  const {
    // _id,
    title,
    due_time,
    remote,
    state,
    suburb,
    street,
    x,
    y,
    address,
    detail,
    images,
    budget,
    type,
    tag,
    status,
    final_price,
    create_user_id,
    create_datetime,
    comments,
    offers,
    deleted,
  } = req.body;

  const task = new taskModel({
    // _id,
    title,
    due_time,
    remote,
    state,
    suburb,
    street,
    x,
    y,
    address,
    detail,
    images,
    budget,
    type,
    tag,
    status,
    final_price,
    create_user_id,
    create_datetime,
    comments,
    offers,
    deleted,
  });
  await task.save();

  // add notification
  await notificationService.createNotification({ task, action: 'createTask' });

  res.status(201).json(task);
};

const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    due_time,
    remote,
    state,
    address,
    detail,
    images,
    budget,
    type,
    tag,
    status,
    final_price,
    create_user_id,
    create_datetime,
    comments,
    offers,
    deleted,
  } = req.body;
  const task = await taskModel
    .findByIdAndUpdate(
      id,
      {
        title,
        due_time,
        remote,
        address,
        detail,
        images,
        budget,
        type,
        tag,
        status,
        final_price,
        create_user_id,
        create_datetime,
        comments,
        offers,
        deleted,
      },
      { new: true }
    ) // 把更新后的数据返回回来
    .exec();
  if (!task) {
    res.status(404).json({ error: 'task not found ' });
    return;
  }

  // add notification
  await notificationService.createNotification({ task, action: 'updateTask' });

  res.json(task);
};

const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findByIdAndDelete(id).exec();
  if (!task) {
    res.status(404).json({ error: 'task not found ' });
    return;
  }

  // add notification
  await notificationService.createNotification({ task, action: 'deleteTask' });

  res.sendStatus(204); // 不需要加内容，它也不返回内容
};

const addTaskToUser = async (req, res) => {
  const { userId, taskId } = req.params;
  const user = await userModel.findById(userId).exec();
  const task = await taskModel.findById(taskId).exec();
  if (!user || !task) {
    res.status(404).json({ error: 'user or task not found' });
    return;
  }
  task.create_user_id = user._id;
  await task.save();
  const updateUser = await userModel
    .findByIdAndUpdate(user._id, { $addToSet: { following_task_id: task._id } }, { new: true })
    .exec();
  res.json(updateUser);
};

const removeTaskFromUser = async (req, res) => {
  const { userId, taskId } = req.params;
  const user = await userModel.findById(userId).exec();
  const task = await taskModel.findByIdAndDelete(taskId).exec();
  if (!user || !task) {
    res.status(404).json({ error: 'user or task not found' });
    return;
  }
  task.create_user_id = '';

  await userModel
    .findByIdAndUpdate(userId, {
      $pull: {
        following_task_id: task._id,
      },
    })
    .exec();
  // await task.save();
  res.sendStatus(204);
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTaskById,
  addTaskToUser,
  removeTaskFromUser,
};
