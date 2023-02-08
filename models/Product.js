const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    uppercase: true,
    alias: 'code',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    default: '(ˊᗜˋ*) successful',
    type: String,
  },
  soldOut: {
    default: false,
    type: Boolean,
  },
});

const Model = mongoose.model('Product', schema);
module.exports = Model;
