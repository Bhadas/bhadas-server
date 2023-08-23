const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { addPost, editPost, deletePost, getAllPost, likethePost } = require("../controller/postController.js");

const router = express.Router();

router.post("/add", authMiddleware, addPost);
router.post("/edit", authMiddleware, editPost);
router.delete("/delete", authMiddleware, deletePost);
router.get("/all-posts", authMiddleware, getAllPost);
router.put("/likes", authMiddleware,likethePost);

module.exports = router