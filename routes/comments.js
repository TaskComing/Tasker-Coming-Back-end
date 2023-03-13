const auth = require('../middleware/authentication');

const { Router } = require('express');
const {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  addReplyToComment,
} = require('../controllers/comments');

const commentRouter = Router();

commentRouter.post('', auth, addComment);
commentRouter.get('', getAllComments);
commentRouter.get('/:id', auth, getCommentById);
commentRouter.put('/:id', auth, updateCommentById);
commentRouter.delete('/:id', auth, deleteCommentById);
// commentRouter.post('/:id', addReplyToComment);
commentRouter.post('/query', auth, addReplyToComment);

module.exports = commentRouter;
