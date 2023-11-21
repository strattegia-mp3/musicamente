const express = require("express");
const router = express.Router();

const storyController = require("../controllers/story.controller");

router.post("/stories", storyController.createStory);
router.get("/stories", storyController.getAllStories);
router.get("/users/:id/stories", storyController.getStoriesByUser);

module.exports = router;
