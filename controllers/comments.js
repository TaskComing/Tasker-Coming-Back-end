const CommentModel = require('../models/comment');

const addComment = async (req, res) => {
  const { text, createDatetime } = req.body;
  const comment = new CommentModel({ text, createDatetime });
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
  const { text, createDatetime } = req.body;
  const comment = await CommentModel.findByIdAndUpdate(
    id,
    { text, createDatetime },
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
  const { text, createDatetime } = req.body;
  // const parentCommentId = req.params.id;
  const parentCommentId = req.query.id;
  const reply = new CommentModel({ text, parentCommentId, createDatetime });
  await reply.save();
  const repliedCommentId = reply._id;
  await CommentModel.findByIdAndUpdate(
    parentCommentId,
    { $addToSet: { repliedCommentIds: repliedCommentId } },
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
