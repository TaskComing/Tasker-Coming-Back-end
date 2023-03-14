const Notification = require('../models/notification');

async function getNotificationList(req, res) {
  const notifications = await Notification.find().exec();
  return res.json(notifications);
}

async function getNotificationById(req, res) {
  const { id } = req.params;

  const notification = await Notification.findById(id).exec();

  if (!notification) {
    return res.status(404).json({ error: 'notification not found' });
  }
  return res.json(notification);
}

async function addNotification(req, res) {
  const { id, read, text, click_url, notification_type } = req.body;

  const existingNotification = await Notification.findById(id).exec();
  if (existingNotification) {
    return res.sendStatus(409); // The request could not be processed because of conflict in the request,
  }

  const notification = new Notification({ read, text, click_url, notification_type });

  await notification.save();
  return res.status(201).json(notification);
}

async function updateNotificationById(req, res) {
  const { id } = req.params;

  const { read, text, click_url, notification_type } = req.body;
  const notification = await Notification.findByIdAndUpdate(id, {
    read,
    text,
    click_url,
    notification_type,
  }).exec();

  if (!notification) {
    return res.sendStatus(404);
  }
  return res.json(notification);
}

async function deleteNotificationById(req, res) {
  const { id } = req.params;
  const notification = await Notification.findByIdAndDelete(id).exec();

  if (!notification) {
    res.status(404).json({ error: 'notification not found' });
    return;
  }

  return res.sendStatus(204);
}

module.exports = {
  getNotificationList,
  getNotificationById,
  addNotification,
  updateNotificationById,
  deleteNotificationById,
};
