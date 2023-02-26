const { Router } = require("express");
const {
  addComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");

const commentRouter = Router();

commentRouter.post("", addComment);
commentRouter.get("", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.put("/:id", updateCommentById);
commentRouter.delete("/:id", deleteCommentById);

module.exports = commentRouter;
