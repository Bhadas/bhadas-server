import express from "express";
import { addComment, editComment, deleteComment,getCommentsByPostId,addReplyToComment, deleteReplyToComment, getComments, getAllComments } from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAll/:postId",authMiddleware, getComments)
router.get("/getAll",authMiddleware, getAllComments)
router.post("/add",authMiddleware, addComment);
router.put("/edit", authMiddleware, editComment);
router.delete("/delete/:id", authMiddleware, deleteComment);
router.get("/:postId", authMiddleware, getCommentsByPostId);
router.post("/reply", authMiddleware, addReplyToComment);
router.delete("/reply", authMiddleware, deleteReplyToComment);

export default router;  