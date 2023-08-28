const Reply = require("../models/Reply");
const Comment = require("../models/comment");
const Post = require("../models/postModel");

exports.getComments = async (req, res) => {
    try {
      const postId = req.params.postId;
      // console.log("<<<<<<<<<<", postId);
      const post = await Post.findOne({ _id: postId });  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }  
      const comments = await Comment.find({ postId }).populate('commentCreatedBy');
      console.log("<<<>><><><",comments)
      res.status(200).json({ isSucces: true, message: "Comments", data: comments });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

exports.getAllComments = async(req,res)=>{
  try{ 
    const allComments = await Comment.find().populate('postId').populate('commentCreatedBy');
    if (!allComments || allComments.length === 0) {
      return res.status(404).json({ isSuccess: false, message: "No data" });
    }
    // console.log("All Comments",allComments)
    res.status(200).json(allComments);
  }catch(error){
    console.error("Error fetching all comments:", error);
      res.status(500).json({ error: "Internal server error" });
  }
}  

exports.addComment = async (req, res) => {
  try {
    const { postId, text, userName } = req.body;
    console.log("<<>><>><>", req.body);
    const comment = new Comment({
      postId,
      commentDescription: text,
      commentCreatedBy: userName,
    });
    const isCommentSaved = await comment.save();
    if (isCommentSaved){
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { numComments: 1 },
        },
        { new: true }
      );
      res.status(201).json({ isSucces: true, message: "comment created successfully." });
   
    } else
      res
        .status(409)
        .json({ isSucces: false, message: "comment not created." });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};
exports.editComment = async (req, res) => {
  try {
    const { commentId, commentDescription } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { commentDescription },
      { new: true }
    );
    if (updatedComment)
      res
        .status(201)
        .json({
          isSucces: true,
          message: "comment updated successfully.",
          data: updatedComment,
        });
    else res.status(409).json({ isSucces: false, message: "Request Failed." });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (comment) {
      const isReplyAvailable = await Reply.find({ replyCommentId: id });
      if (isReplyAvailable.length !== 0)
        await Reply.findByIdAndDelete({ replyCommentId: id });
      res
        .status(200)
        .json({
          isSuccess: true,
          message: "comment deleted successfully",
          data: comment,
        });
    } else res.status(409).json({ isSucces: false, message: "Request Failed" });
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};
exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    // const replyIds = [];
    const allComments = await Comment.find({ commentPostId: postId });
    if (!allComments)
      res.status(404).json({ isSucces: false, message: "No Data" });
    const replies = allComments.map((comment) => comment.replies.keys());
    // console.log(replies.values());
    const replyIds = replies
      .map((x) => {
        return Array.from(x);
      })
      .flat();
    const allReplies = await Reply.find({ _id: { $in: replyIds } });
    const dataToReturn = Object.freeze({
      comments: allComments,
      replies: allReplies,
    });
    res
      .status(200)
      .json({ isSucces: true, message: "All Comments", data: dataToReturn });
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${err}` });
  }
};
exports.addReplyToComment = async (req, res) => {
  try {
    const { replyDescription, replyCommentId, replyCreatedBy } = req.body;
    const newReply = new Reply({
      replyDescription,
      replyCommentId,
      replyCreatedBy,
    });
    const isReplySaved = await newReply.save();
    if (isReplySaved) {
      const commentOfReply = await Comment.findOne({ _id: replyCommentId });
      if (!commentOfReply.replies.has(isReplySaved._id))
        commentOfReply.replies.set(isReplySaved._id, true);
      commentOfReply.save();
      res
        .status(200)
        .json({
          isSucces: true,
          message: "Reply saved successfully.",
          data: isReplySaved,
        });
    } else {
      res
        .status(409)
        .json({ isSucces: false, message: "Reply Not Successful." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${err}` });
  }
};
exports.editReplyToComment = async (req, res) => {
  try {
    const { replyDescription, replyId } = req.body;
    const updatedReply = Reply.findByIdAndUpdate(
      replyId,
      { replyDescription },
      { new: true }
    );
    if (updatedReply)
      res
        .status(201)
        .json({
          isSucces: true,
          message: "reply updated successfully.",
          data: updatedReply,
        });
    else res.status(409).json({ isSucces: false, message: "Request Failed." });
  } catch (error) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${err}` });
  }
};
exports.deleteReplyToComment = async (req, res) => {
  try {
    const { id } = req.body;
    const reply = await Reply.findByIdAndDelete(id);
    if (reply)
      res
        .status(200)
        .json({
          isSuccess: true,
          message: "reply deleted successfully",
          data: reply,
        });
    else res.status(409).json({ isSucces: false, message: "Request Failed" });
  } catch (err) {
    res
      .status(500)
      .json({ isSucces: false, message: `Request failed due to ${error}` });
  }
};
