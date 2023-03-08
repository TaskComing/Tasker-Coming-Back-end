const { Schema, model } = require('mongoose');

const offerSchema = new Schema({
  _id: {
    type: String,
    uppercase: true,
    // alias: 'code',
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
  deleted: {
    default: false,
    type: Boolean,
  },
  create_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  create_datetime: {
    type: Date,
    required: true,
    default: new Date().getTime(),
  },
});
const OfferModel = model('Offer', offerSchema);
module.exports = OfferModel;
