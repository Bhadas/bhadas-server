const mongoose =require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    commentDescription: {
      type: String,
      required: true,
      min: 10,
      max: 500,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    // replies : {
    //     type: Map,
    //     of: String,
    //     required: true,
    //     default: {}
    // },
    commentCreatedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
