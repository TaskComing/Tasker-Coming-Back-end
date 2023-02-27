// const Joi = require('joi');
const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  repliedCommentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    // default: '',
  },
  createUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createDatetime: {
    type: Date,
    required: true,
    default: new Date().getTime(),
  },
});

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;
