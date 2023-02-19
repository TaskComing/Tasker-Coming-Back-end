const { Router } = require('express');

const {
  getNotificationList,
  getNotificationById,
  addNotification,
  updateNotificationById,
  deleteNotificationById,
} = require('../controllers/notifications');

const notificationRouter = Router();

notificationRouter.get('', getNotificationList);
notificationRouter.post('', addNotification);
notificationRouter.get('/:id', getNotificationById);
notificationRouter.put('/:id', updateNotificationById);
notificationRouter.delete('/:id', deleteNotificationById);

module.exports = notificationRouter;
