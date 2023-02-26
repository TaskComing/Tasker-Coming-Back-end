const CommentModel = require('../models/comment');

const addComment = async (req, res) => {
  const { text, reply, createDatetime } = req.body;
  const comment = new CommentModel({ text, reply, createDatetime });
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
  const { text, reply, createDatetime } = req.body;
  const comment = await CommentModel.findByIdAndUpdate(
    id,
    { text, reply, createDatetime },
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

module.exports = {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
