const Notification = require('../models/Notification');
const User = require('../models/User');

/**
 * @openapi
 * /api/notification:
 *   get:
 *     summary: Get user's notification list
 *     description: Retrieves the notification list for a given user ID.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */

async function getNotificationList(req, res) {
  const { userId } = req.user;
  // const userId = '6411040776987b7e139eeeb4';
  const { notification_id: notifications } = await User.findById(userId)
    .select('notification_id')
    .populate({
      path: 'notification_id',
      populate: {
        path: 'userInfo',
        select: 'head_img_url firstName lastName',
      },
    })
    .exec();

  const formatedNotifications = notifications.map((notification) => ({
    ...notification._doc,
    id: notification._doc._id,
  }));

  return res.json(formatedNotifications);
}

async function getNotificationById(req, res) {
  const { id } = req.params;

  const notification = await Notification.findById(id).exec();

  if (!notification) {
    return res.status(404).json({ error: 'notification not found' });
  }
  return res.json(notification);
}



async function updateNotificationById(req, res) {
  // const { id } = req.params;

  const { id, read, text, click_url, type, userInfo } = req.body;

  const notification = await Notification.findByIdAndUpdate(
    id,
    {
      read,
      text,
      click_url,
      type,
      userInfo,
    },
    { new: true }
  ).exec();

  if (!notification) {
    return res.sendStatus(404);
  }
  return res.json(notification); // outdated notification
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
  updateNotificationById,
  deleteNotificationById,
};
