const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");

router.post("/messages", messageController.createMessage);
router.get("/conversations/:id/messages", messageController.getMessagesInConversation);
router.patch("/messages/:id", messageController.updateMessage);
router.delete("/messages/:id", messageController.deleteMessage);

module.exports = router;
