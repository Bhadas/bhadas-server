import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    postTags: {
      type: Array,
      required: false,
      default: [],
    },
    postDescription: {
      type: String,
      required: false,
      default: "",
      max: 2000,
    },
    postCreatedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    numLikes: {
      type: Number,
      default: 0,
    },
    numComments:{
      type:Number,
      default:0,
    }
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", PostSchema);
export default Post;
