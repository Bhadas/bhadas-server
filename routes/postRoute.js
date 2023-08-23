import express from "express";
import { addPost, editPost, deletePost, getAllPost, likePost, getAllPostByGroupId, getAllPostByUserId, likethePost } from "../controllers/postController.js";
import { verifyStudentToken } from "../middleware/authorization.js";

const router = express.Router();

router.post("/add", verifyStudentToken, addPost);
router.post("/edit", verifyStudentToken, editPost);
router.delete("/delete", verifyStudentToken, deletePost);
router.get("/all-posts", verifyStudentToken, getAllPost);
router.patch("/like/:id/:userId", verifyStudentToken, likePost);
router.put("/likes", likethePost);


export default router;