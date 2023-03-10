const { Router } = require('express');
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addUserToComment,
  removeUserFromComment,
  addNotificationToUser,
  removeNotificationFromUser,
  addTaskToUser,
  removeTaskFromUser,
} = require('../controllers/users');

const userRouter = Router();

userRouter.post('', addUser);
userRouter.get('', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);

userRouter.post('/:userId/comments/:commentId', addUserToComment);
userRouter.delete('/:userId/comments/:commentId', removeUserFromComment);

userRouter.post('/:notificationId/users/:userId', addNotificationToUser);
userRouter.delete('/:notificationId/users/:userId', removeNotificationFromUser);

userRouter.post('/:taskId/users/:userId', addTaskToUser);
userRouter.delete('/:taskId/users/:userId', removeTaskFromUser);

module.exports = userRouter;