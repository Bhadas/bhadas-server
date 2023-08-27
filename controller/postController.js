const Like =  require("../models/Like.js");
const Post = require("../models/postModel.js");

exports.addPost = async (req, res) => {
  try {
    const {
      postTags,
      postDescription,
      postCreatedBy,
    } = req.body;
    
    const newPost = new Post({
      postTags,
      postDescription,
      postCreatedBy,
    });
    const isPostSaved = await newPost.save();
    if (isPostSaved) {
      res
        .status(201)
        .json({ isSucces: true, message: "Post created successfully." });
    } else
      res.status(409).json({ isSucces: false, message: "Request failed." });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};

exports.editPost = async (req, res) => {
  try {
    const {
      postId,
      postTags,
      postDescription,
      postCreatedBy,
    } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        postTags,
        postDescription,
        postCreatedBy,
      },
      {
        new: true,
      }
    );
    if (post)
      res
        .status(201)
        .json({
          isSucces: true,
          message: "post updated successfully.",
          data: post,
        });
    else res.status(409).json({ isSucces: false, message: "Request Failed." });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await Post.findByIdAndDelete(id);
    if (post)
      res
        .status(200)
        .json({
          isSuccess: true,
          message: "post deleted successfully",
          data: post,
        });
    else res.status(409).json({ isSucces: false, message: "Request Failed" });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find().populate('postCreatedBy');
    if (!allPosts)
      res.status(404).json({ isSucces: false, message: "No Data" });
    res
      .status(200)
      .json({ isSucces: true, message: "All Posts Found", data: allPosts });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};



exports.likethePost = async (req, res) => {
  try{
    const {postId, userId } = req.body;
  const post = await Post.findById(postId);
  console.log("userId",userId, "postId", postId)
  const isLiked = post?.isLiked;

  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { numLikes: -1 },
        isLiked: false,
      },
      { new: true }
    );
    await Like.findOneAndDelete({ postId, userId })
    console.log("<<<<<",post)
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { numLikes: 1 },
        isLiked: true,
      },
      { new: true }
    );
    await Like.create({ postId, userId });
    console.log(">>>>>>",post)

    res.json(post);
  }
  }catch(error){
    console.error(error.message)
  }
};


