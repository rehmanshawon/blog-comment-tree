const express = require("express");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const { createCommentValidation } = require("../validation/validate");

//var mongoose = require("mongoose");

const router = express.Router();

router.post(
  "/createComment",
  asyncHandler(async (req, res, next) => {
    const { error } = createCommentValidation(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      next(err);
    }
    const { commentor, comment, parentBlog, parentComment } = req.body;

    const comt = await Comment.create({
      commentor,
      comment,
      parentBlog,
      parentComment,
    });
    res.json({
      id: comt._id,
      commentor: comt.commentor,
      comment: comt.comment,
      parentBlog: comt.parentBlog,
      parentComment: comt.parentComment,
    });
  })
);

router.get(
  "/all",
  asyncHandler(async (req, res, next) => {
    Comment.find({})
      .populate("parentBlog")
      .populate("parentComment")
      .then(function (comments) {
        console.log(comments);
        res.json(comments);
      });
  })
);

router.get(
  "/comment/:id",
  asyncHandler(async (req, res, next) => {
    var commentId = req.params.id;
    Comment.findById(commentId)
      .populate("parentBlog")
      .populate("parentComment")
      .then(function (comment) {
        res.json(comment);
      });
  })
);

router.get(
  "/comments/:id",
  asyncHandler(async (req, res, next) => {
    var blogId = req.params.id;
    Comment.find({ parentBlog: blogId })
      .populate("parentBlog")
      .populate("parentComment")
      .then(function (comments) {
        res.json(comments);
      });
  })
);

module.exports = router;
