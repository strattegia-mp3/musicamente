const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topic.controller");

router.post("/topics", topicController.createTopic);
router.get("/topics", topicController.getAllTopics);
router.get("/users/:id/topics", topicController.getTopicsByUser);
router.post("/topics/replies", topicController.createReply);
router.get("/topics/:topicId/replies", topicController.getAllReplies);
router.get("/users/:userId/replies", topicController.getRepliesByUser);
router.patch("/topics/replies/:id", topicController.editReply);
router.delete("/topics/replies/:id", topicController.deleteReply);
router.patch("/topics/:id", topicController.editTopic);
router.delete("/topics/:id", topicController.deleteTopic);

module.exports = router;
