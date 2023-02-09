const { Router } = require('express');

const {
  getTaskList,
  getTaskByCode,
  addTask,
  updateTaskByCode,
} = require('../controllers/task');

const taskRouter = Router();

taskRouter.get('', getTaskList);
taskRouter.post('', addTask);
taskRouter.get('/:id', getTaskByCode);
taskRouter.put('/:id', updateTaskByCode);

module.exports = taskRouter;
