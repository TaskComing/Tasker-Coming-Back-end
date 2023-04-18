const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         read:
 *           type: boolean
 *           default: false
 *         text:
 *           type: string
 *           required: true
 *         click_url:
 *           type: string
 *           required: true
 *         type:
 *           type: string
 *           required: true
 *           enum: [comment, offer, task]
 *         userInfo:
 *           type: string
 *           required: true
 *           description: The object ID of the user associated with this notification
 *           format: uuid
 *       required:
 *         - text
 *         - click_url
 *         - type
 *         - userInfo
 */

const notificationSchema = new mongoose.Schema(
  {
    read: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    click_url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator(v) {
          return ['comment', 'offer', 'task'].includes(v);
        },
        message: (props) => `${props.value} is not a valid notification type`,
      },
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    id: true,
    versionKey: false,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
