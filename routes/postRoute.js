import express from "express";
import { addPost, editPost, deletePost, getAllPost, likePost, getAllPostByGroupId, getAllPostByUserId, likethePost } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addPost);
router.post("/edit", authMiddleware, editPost);
router.delete("/delete", authMiddleware, deletePost);
router.get("/all-posts", authMiddleware, getAllPost);
router.patch("/like/:id/:userId", authMiddleware, likePost);
router.put("/likes", authMiddleware,likethePost);


export default router;