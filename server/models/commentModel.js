const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentor: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    comment: {
      type: String,
      required: true,
    },
    parentBlog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
