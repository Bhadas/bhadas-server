const express = require("express");
// const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { addPost, editPost, deletePost, getAllPost, likethePost } = require("../controller/postController.js");

const router = express.Router();

router.post("/add", addPost);
router.post("/edit", editPost);
router.delete("/delete", deletePost);
router.get("/all-posts", getAllPost);
router.put("/likes",likethePost);

module.exports = router