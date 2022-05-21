const express = require("express");
const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
//const User = require("../models/userModel");
//const { generateToken } = require("../utils/generateToken");
const { createBlogValidation } = require("../validation/validate");
var mongoose = require("mongoose");

const router = express.Router();

router.post(
  "/createblog",
  asyncHandler(async (req, res, next) => {
    const { error } = createBlogValidation(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      next(err);
    }
    const { blogTitle, blogBody, blogWriter } = req.body;
    var id = mongoose.Types.ObjectId(blogWriter);
    const blog = await Blog.create({
      blogTitle,
      blogBody,
      blogWriter,
    });
    res.json({ id: blog._id, title: blog.blogTitle, writer: blog.blogWriter });
  })
);

router.get(
  "/all",
  asyncHandler(async (req, res, next) => {
    Blog.find({})
      .populate("blogWriter")
      .then(function (blogs) {
        //console.log(blogs);
        res.json(blogs);
      });
  })
);

router.get(
  "/blog/:id",
  asyncHandler(async (req, res, next) => {
    var blogId = req.params.id;
    Blog.findById(blogId)
      .populate("blogWriter")
      .then(function (blog) {
        res.json(blog);
      });
  })
);

module.exports = router;
