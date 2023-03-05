const CommentModel = require('../models/comment');

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
  const comment = await CommentModel.findById(id).exec();
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
  const comment = await CommentModel.findByIdAndDelete(id).exec();
  if (!comment) {
    res.status(404).json({ error: 'comment not found' });
    return;
  }
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

module.exports = {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  addReplyToComment,
};
