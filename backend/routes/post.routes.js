const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.post("/posts", postController.createPost);
router.get("/posts", postController.getAllPosts);
router.get("/users/:id/posts", postController.getAllPosts);
router.post("/posts/:id/like", postController.likePost);
router.post("/posts/:id/dislike", postController.dislikePost);
router.post("/posts/:id/comments", postController.addComment);
router.patch("/posts/:id/comments/:commentId", postController.editComment);
router.delete("/posts/:id/comments/:commentId", postController.deleteComment);
router.patch("/posts/:id", postController.editPost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
