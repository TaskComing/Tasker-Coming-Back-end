const { Router } = require('express');
const auth = require('../middleware/authentication');

const {
  addComment,
  getAllCommentsByTask,
  getAllComments,
  // getCommentById,
  updateCommentById,
  deleteCommentById,
  addReplyToComment,
  addCommentToUser,
  addCommentToTask,
  // removeCommentFromUser,
} = require('../controllers/comments');

const commentRouter = Router();

commentRouter.post('', auth, addComment);
commentRouter.get('', getAllComments);
commentRouter.get('/:id', getAllCommentsByTask);
commentRouter.put('/:id', auth, updateCommentById);
commentRouter.delete('/:id', auth, deleteCommentById);
// commentRouter.post('/:id', addReplyToComment);
commentRouter.post('/:id', auth, addReplyToComment);
commentRouter.post('/:commentId/tasks/:taskId', auth, addCommentToTask);
commentRouter.post('/:commentId/users/:userId', auth, addCommentToUser);
// commentRouter.delete('/:commentId/users/:userId', removeCommentFromUser);

module.exports = commentRouter;
