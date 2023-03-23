const { Router } = require('express');
const auth = require('../middleware/authentication');

const {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  addReplyToComment,
  addCommentToUser,
  // removeCommentFromUser,
} = require('../controllers/comments');

const commentRouter = Router();

commentRouter.post('', auth, addComment);
commentRouter.get('', getAllComments);
commentRouter.get('/:id', auth, getCommentById);
commentRouter.put('/:id', auth, updateCommentById);
commentRouter.delete('/:id', auth, deleteCommentById);
// commentRouter.post('/:id', addReplyToComment);
commentRouter.post('/query', auth, addReplyToComment);

commentRouter.post('/:commentId/users/:userId', auth, addCommentToUser);
// commentRouter.delete('/:commentId/users/:userId', removeCommentFromUser);

module.exports = commentRouter;
