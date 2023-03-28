const express = require('express');
const auth = require('../middleware/authentication');

const {
  addTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  addTaskToUser,
  removeTaskFromUser,
} = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.post('/', addTask);
taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTaskById);
taskRouter.delete('/:id', deleteTaskById);
taskRouter.post('/:taskId/users/:userId', addTaskToUser);
taskRouter.delete('/:taskId/users/:userId', removeTaskFromUser);

module.exports = taskRouter;
