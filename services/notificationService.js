const Notification = require('../models/Notification');
const UserModel = require('../models/User');

/**
 * An array of notification objects.
 *
 * @typedef {Object} Notification
 * @property {boolean} read - Indicates whether the notification has been read or not.
 * @property {string} text - The notification text.
 * @property {string} click_url - The URL to redirect to upon clicking the notification.
 * @property {string} type - The type of the notification.
 * @property {ObjectID} userInfo - The ObjectID of the user associated with the notification.
 * @property {ObjectID} _id - The ObjectID of the notification.
 * @property {Date} createdAt - The date and time the notification was created.
 * @property {Date} updatedAt - The date and time the notification was last updated.
 *
 * @param {Notification[]} notifications - An array of notification objects.
 */

const addNotificationToUser = async (notifications) => {
  const bulkOps = notifications.map((notification) => ({
    updateOne: {
      filter: { _id: notification.targetUser },
      update: { $push: { notification_id: notification._id } },
    },
  }));
  const result = await UserModel.bulkWrite(bulkOps);
  return result;
};

/**
 * Sends a notification about a task update to specified users.
 * @param {createNotification} notification - The notification object.
 *
 * @typedef {Object} createNotification
 * @property {string} text - The notification message text.
 * @property {string} click_url - The URL to redirect the user when they click on the notification.
 * @property {string} type - The type of notification, in this case it's a task notification.
 * @property {ObjectId[]} userIds - An array of ObjectIds of users who should receive the notification.
 */

async function createNotification({ task, action, offer }) {
  let taskerNotification = {};
  let assigneeNotifications = [];

  const click_url = `/task-details/${task._id}`;

  switch (action) {
    case 'createTask':
      taskerNotification = {
        text: `Your task ${task.title} has been created successfully`,
        click_url,
        type: 'task',
        targetUser: task.create_user_id,
        userInfo: '643d25afde060c7b53f3c983',
      };
      break;
    case 'updateTask':
      taskerNotification = {
        text: `Your task ${task.title} has been updated successfully`,
        click_url,
        type: 'task',
        targetUser: task.create_user_id,
        userInfo: '643d25afde060c7b53f3c983',
      };
      assigneeNotifications = task.offers.map((userId) => ({
        text: `The task ${task.title} you have offered to is updated`,
        click_url,
        type: 'task',
        targetUser: userId,
        userInfo: '643d25afde060c7b53f3c983',
      }));
      break;
    case 'deleteTask':
      taskerNotification = {
        text: `Your task ${task.title} has been deleted successfully`,
        click_url,
        type: 'task',
        targetUser: task.create_user_id,
        userInfo: '643d25afde060c7b53f3c983',
      };
      assigneeNotifications = task.offers.map((userId) => ({
        text: `The task ${task.title} you have offered to is cancelled`,
        click_url,
        type: 'task',
        targetUser: userId,
        userInfo: '643d25afde060c7b53f3c983',
      }));
      break;
    case 'createOffer':
      taskerNotification = {
        text: `Your task ${task.title} has received a new offer`,
        click_url,
        type: 'task',
        targetUser: task.create_user_id,
        userInfo: '643d25afde060c7b53f3c983',
      };

      assigneeNotifications = [
        {
          text: `Your offer to task ${task.title} has been submitted successfully`,
          click_url,
          type: 'offer',
          targetUser: offer.create_user_id,
          userInfo: '643d25afde060c7b53f3c983',
        },
      ];
      break;
    case 'offerAssigned':
      taskerNotification = {
        text: `You have accepted the offer for task ${task.title}`,
        click_url,
        type: 'task',
        // userInfo: task.create_user_id,
        userInfo: '643d25afde060c7b53f3c983',
        targetUser: task.create_user_id,
      };

      assigneeNotifications = task.offers.map((offerItem) =>
        offerItem.status === 'accepted'
          ? {
              text: `Your offer to task ${task.title} has been accepted`,
              click_url,
              type: 'offer',
              // userInfo: offerItem.create_user_id,
              userInfo: '643d25afde060c7b53f3c983',
              targetUser: offerItem.create_user_id,
            }
          : {
              text: `Your offer to task ${task.title} has been assigned to another user`,
              click_url,
              type: 'offer',
              // userInfo: offerItem.create_user_id,
              userInfo: '643d25afde060c7b53f3c983',
              targetUser: offerItem.create_user_id,
            }
      );
      break;
    default:
      break;
  }

  const notifications = [taskerNotification, ...assigneeNotifications];

  // create notification
  const savedNotifications = await Notification.insertMany(notifications);
  // add notification to the user
  await addNotificationToUser(savedNotifications);

  return savedNotifications;
}

module.exports = {
  createNotification,
};
