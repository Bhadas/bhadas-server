import express from "express";
import { addComment, editComment, deleteComment,getCommentsByPostId,addReplyToComment, deleteReplyToComment, getComments, getAllComments } from "../controllers/commentController.js";
import { verifyAdminToken, verifyStudentToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/getAll/:postId",verifyStudentToken, getComments)
router.get("/getAll",verifyAdminToken, getAllComments)
router.post("/add",verifyStudentToken, addComment);
router.put("/edit", verifyStudentToken, editComment);
router.delete("/delete/:id", verifyStudentToken, deleteComment);
router.get("/:postId", verifyStudentToken, getCommentsByPostId);
router.post("/reply", verifyStudentToken, addReplyToComment);
router.delete("/reply", verifyStudentToken, deleteReplyToComment);

export default router;  