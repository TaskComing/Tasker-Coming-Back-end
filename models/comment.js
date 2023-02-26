const Joi = require('joi');
const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  reply: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  createDatetime: {
    type: Date,
    required: true,
    default: new Date().getTime(),
  },
});

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;
