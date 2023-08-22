const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controller/messageController");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(authMiddleware, allMessages);
router.route("/").post(authMiddleware, sendMessage);

module.exports = router;
