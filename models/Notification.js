const mongoose = require('mongoose');

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
    // templateId: {
    //   //type: mongoose.Schema.Types.String,
    //   type: String,
    //   default: 'welcome',
    //   ref: 'NotificationTemplate'
    // },
    notification_type: {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  },
  {
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
