//import User from "./userModel.js";
const mongoose = require("mongoose");
//const
//const bcrypt = require("bcryptjs");

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      default: "Untitled",
    },
    blogBody: {
      type: String,
      required: true,
    },
    blogWriter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
