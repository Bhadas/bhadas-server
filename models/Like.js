const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);
const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;

