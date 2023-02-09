const Task = require('../models/task');

async function getTaskList(req, res) {
  const tasks = await Task.find().exec();
  return res.json(tasks);
}

async function getTaskByCode(req, res) {
  const { _id } = req.params;
  const task = await Task.findById(_id).exec();
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  return res.json(task);
}

async function addTask(req, res) {
  const { _id, title, state, deleted } = req.body;
  const existingTask = await Task.findById(_id).exec();
  if (existingTask) {
    return res.sendStatus(409); // The request could not be processed because of conflict in the request,
  }

  const task = new Task({
    _id,
    title,
    state,
    deleted,
  });

  await task.save();
  return res.status(201).json(task);
}

async function updateTaskByCode(req, res) {
  const { _id } = req.params;
  const { title, state, deleted } = req.body;
  const task = await Task.findByIdAndUpdate(_id, { title, state, deleted }).exec();

  if (!task) {
    return res.sendStatus(404);
  }

  return res.json(task);
}

module.exports = {
  getTaskList,
  getTaskByCode,
  addTask,
  updateTaskByCode,
};
