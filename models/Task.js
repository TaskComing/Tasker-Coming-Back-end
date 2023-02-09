const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    uppercase: true,
    // alias: 'code',
  },
  title: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
  deleted: {
    default: false,
    type: Boolean,
  },
});

const Model = mongoose.model('Task', schema);
module.exports = Model;
