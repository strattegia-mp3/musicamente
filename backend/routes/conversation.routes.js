const express = require("express");
const router = express.Router();

const conversationController = require("../controllers/conversation.controller");

router.post("/conversations", conversationController.createConversation);
router.get(
  "/users/:id/conversations",
  conversationController.getConversationsByUser
);
router.patch("/conversations/:id", conversationController.updateConversation);
router.delete("/conversations/:id", conversationController.deleteConversation);

module.exports = router;
