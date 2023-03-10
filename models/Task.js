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
  },
  deleted: {
    default: false,
    type: Boolean,
  },
  due_time: {
    type: Date,
    default: Date.now,
  },
  remote: {
    type: Boolean,
  },
  x: {
    type: mongoose.Decimal128,
    default: 0,
  },
  y: {
    type: mongoose.Decimal128,
    default: 0,
  },
  detail: {
    type: String,
  },
  images: {
    type: [String],
  },
  budget: {
    type: Number,
  },
  type: {
    type: String,
  },
  tag: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
  },
  final_price: {
    type: Number,
  },
  create_user_id: {
    type: Number,
  },
  create_datetime: {
    //数据库的名字是datetime
    type: Date,
  },
  comments: {
    type: [String],
  },
  offers: {
    type: Array,
  },
});

const TaskModel = mongoose.model('Task', schema);
module.exports = TaskModel;
