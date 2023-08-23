import imageUpload from "../helpers/cloudinary.js";
import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const addPost = async (req, res) => {
  try {
    const {
      postTags,
      postDescription,
      postCreatedBy,
    } = req.body;
    const postTagsArray = postTags.split(",");
    
    const newPost = new Post({
      postTags: postTagsArray,
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
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${err}` });
  }
};

export const editPost = async (req, res) => {
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
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};

export const deletePost = async (req, res) => {
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
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPosts = (await Post.find()).flat();
    if (!allPosts)
      res.status(404).json({ isSucces: false, message: "No Data" });
    res
      .status(200)
      .json({ isSucces: true, message: "All Posts Found", data: allPosts });
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};



export const likethePost = async (req, res) => {
  const {postId, userName } = req.body;
  const post = await Post.findById(postId);
  console.log("userName",userName, "postId", postId)
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
    await Like.findOneAndDelete({ postId, userName })
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
    await Like.create({ postId, userName });
    console.log(">>>>>>",post)

    res.json(post);
  }
};
