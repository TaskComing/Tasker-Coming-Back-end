const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  replied_comment_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  parent_comment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    // default: '',
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

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;
