const mongoose = require('mongoose');
// const { Schema, model } = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  due_time: {
    type: Date,
    default: Date.now,
  },
  remote: {
    type: Boolean,
  },
  state: {
    type: Number,
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
    default: '',
  },
  images: {
    type: [String],
    default: '',
  },
  budget: {
    type: Number,
    default: 0,
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
    default: 0,
  },
  create_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  create_datetime: {
    // 数据库的名字是datetime
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [String],
    default: '',
  },
  offers: {
    type: Array,
  },
  deleted: {
    default: false,
    type: Boolean,
  },
});

const TaskModel = mongoose.model('Task', schema);
module.exports = TaskModel;
