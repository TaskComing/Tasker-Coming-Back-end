const express = require('express');
const {
  addTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.post('/', addTask);
taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTaskById);
taskRouter.delete('/:id', deleteTaskById);

module.exports = taskRouter;
