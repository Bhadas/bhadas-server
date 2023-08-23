import mongoose from "mongoose";
const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userName: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);
const Like = mongoose.model("Like", LikeSchema);
export default Like;
