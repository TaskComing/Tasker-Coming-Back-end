// code start
const taskModel = require('../models/Task');

const getAllTasks = async (req, res) => {
  const tasks = await taskModel.find().exec();
  res.json(tasks);
};
const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findById(id).exec();
  if (!task) {
    res.status(404).json({ error: 'task not found ' });
    return;
  }
  res.json(task);
};

const addTask = async (req, res) => {
  const {
    due_time,
    remote,
    x,
    y,
    detail,
    images,
    budget,
    type,
    tag,
    status,
    comments,
    offers,
    deleted,
  } = req.body;

  const task = new taskModel({
    due_time,
    remote,
    x,
    y,
    detail,
    images,
    budget,
    type,
    tag,
    status,
    comments,
    offers,
    deleted,
  });
  await task.save();
  res.status(201).json(task);
};

const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const {
    due_time,
    remote,
    x,
    y,
    detail,
    images,
    budget,
    type,
    tag,
    status,
    comments,
    offers,
    deleted,
  } = req.body;
  const task = await taskModel
    .findByIdAndUpdate(
      id,
      {
        due_time,
        remote,
        x,
        y,
        detail,
        images,
        budget,
        type,
        tag,
        status,
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
  res.json(task);
};

const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findByIdAndDelete(id).exec();
  if (!task) {
    res.status(404).json({ error: 'task not found ' });
    return;
  }
  res.sendStatus(204); // 不需要加内容，它也不返回内容
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTaskById,
};
