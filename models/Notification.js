const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  isUnRead: {
    type: Boolean,
    default: true,
    required: true,
  },
  templateId: {
    //type: mongoose.Schema.Types.String,
    type: String,
    default: 'welcome',
    ref: 'NotificationTemplate'
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

