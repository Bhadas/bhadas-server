const mongoose = require("mongoose");
const ReplySchema = new mongoose.Schema(
    {
        replyDescription : {
            type: String,
            required: true,
            min: 10,
            max: 500
        },
        replyCommentId: {
            type: String,
            required: true,
            default:""
        },
        replyCreatedBy: {
            type: String,
            required: true,
            default: ""
        },
    },
    {
        timestamps: true
    });
const Reply = mongoose.model("Reply", ReplySchema);
module.exports =  Reply;