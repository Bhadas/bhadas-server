const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { getComments, getAllComments, addComment, editComment, deleteComment, getCommentsByPostId, addReplyToComment, deleteReplyToComment } = require("../controller/commentController");

const router = express.Router();

router.get("/getAll/:postId",authMiddleware, getComments)
router.get("/getAll",authMiddleware, getAllComments)
router.post("/add",authMiddleware, addComment);
router.put("/edit", authMiddleware, editComment);
router.delete("/delete/:id", authMiddleware, deleteComment);
router.get("/:postId", authMiddleware, getCommentsByPostId);
router.post("/reply", authMiddleware, addReplyToComment);
router.delete("/reply", authMiddleware, deleteReplyToComment);

module.exports = router