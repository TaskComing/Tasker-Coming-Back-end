const { Schema, model } = require('mongoose');

const offerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
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
  create_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  create_datetime: {
    type: Date,
    required: true,
    default: new Date().getTime(),
  },
  status: {
    type: String,
    default: 'pending',
    required: true,
    lowercase: true,
    validate: {
      validator(v) {
        return ['accepted', 'rejected', 'pending'].includes(v);
      },
      message: (props) => `${props.value} is not a valid notification type`,
    },
  },
});
const OfferModel = model('Offer', offerSchema);
module.exports = OfferModel;
