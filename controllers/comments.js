const CommentModel = require('../models/Comment');
const UserModel = require('../models/User');

const addComment = async (req, res) => {
  const { text, create_datetime } = req.body;
  const comment = new CommentModel({ text, create_datetime });
  await comment.save();
  res.status(201).json(comment);
};

const getAllComments = async (req, res) => {
  const comments = await CommentModel.find().exec();
  res.json(comments);
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await CommentModel.findById(id).populate('create_user_id').exec();
  if (!comment) {
    res.status(404).json({ error: 'comment not found' });
    return;
  }
  res.json(comment);
};

const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { text, create_datetime } = req.body;
  const comment = await CommentModel.findByIdAndUpdate(
    id,
    { text, create_datetime },
    { new: true }
  ).exec();
  if (!comment) {
    res.status(404).json({ error: 'comment not found' });
    return;
  }
  res.json(comment);
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  // const user = await UserModel.findById(userId).exec();
  const comment = await CommentModel.findByIdAndDelete(id).exec();
  if (!comment) {
    res.status(404).json({ error: 'comment not found' });
    return;
  }
  await UserModel.updateMany(
    { comments_id: id },
    {
      $pull: {
        comments_id: id,
      },
    }
  ).exec();
  res.sendStatus(204);
};

const addReplyToComment = async (req, res) => {
  const { text, create_datetime } = req.body;
  // const parentCommentId = req.params.id;
  const parent_comment_id = req.query.id;
  const reply = new CommentModel({ text, parent_comment_id, create_datetime });
  await reply.save();
  const replied_comment_id = reply._id;
  await CommentModel.findByIdAndUpdate(
    parent_comment_id,
    { $addToSet: { replied_comment_ids: replied_comment_id } },
    { new: true }
  ).exec();
  res.status(201).json(reply);
};

const addCommentToUser = async (req, res) => {
  const { userId, commentId } = req.params;
  const user = await UserModel.findById(userId).exec();
  const comment = await CommentModel.findById(commentId).exec();
  if (!user || !comment) {
    res.status(404).json({ error: 'user or comment not found' });
    return;
  }
  comment.create_user_id = user._id;
  await comment.save();
  const updateUser = await UserModel.findByIdAndUpdate(
    user._id,
    { $addToSet: { comments_id: comment._id } },
    { new: true }
  );
  res.json(updateUser);
};

// const removeCommentFromUser = async (req, res) => {
//   const { userId, commentId } = req.params;
//   const user = await UserModel.findById(userId).exec();
//   const comment = await CommentModel.findById(commentId).exec();
//   if (!user || !comment) {
//     res.status(404).json({ error: 'user or comment not found' });
//     return;
//   }
//   comment.create_user_id = '';
//   await comment.save();
//   await UserModel.findByIdAndUpdate(userId, {
//     $pull: {
//       comments_id: comment._id,
//     },
//   }).exec();
//   res.sendStatus(204);
// };

module.exports = {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  addReplyToComment,
  addCommentToUser,
  // removeCommentFromUser,
};
