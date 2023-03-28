const { Router } = require('express');

const {
  getNotificationList,
  getNotificationById,
  updateNotificationAsReadById,
  deleteNotificationById,
} = require('../controllers/notifications');

const notificationRouter = Router();

notificationRouter.get('', getNotificationList);
notificationRouter.get('/:id', getNotificationById);
notificationRouter.put('/:id', updateNotificationAsReadById);
notificationRouter.delete('/:id', deleteNotificationById);

module.exports = notificationRouter;
