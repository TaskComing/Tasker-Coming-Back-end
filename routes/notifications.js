const { Router } = require('express');

const {
  getNotificationList,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require('../controllers/notifications');

const notificationRouter = Router();

notificationRouter.get('', getNotificationList);
notificationRouter.get('/:id', getNotificationById);
notificationRouter.put('/', updateNotificationById);
notificationRouter.delete('/:id', deleteNotificationById);

module.exports = notificationRouter;
