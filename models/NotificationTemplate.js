const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  _id: {
    type: String,
    alias: 'templateId',
  },
  content: {
    type: String,
  },
});

const Template = mongoose.model('NotificationTemplate', templateSchema);

module.exports = Template;
