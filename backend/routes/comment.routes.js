const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");

router.post("/comments", commentController.createComment);
router.get("/posts/:id/comments", commentController.getAllCommentsForPost);
router.get("/users/:id/comments", commentController.getAllCommentsByUser);
router.patch("/comments/:id", commentController.updateComment);
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
