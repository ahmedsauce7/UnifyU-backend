const router = require("express").Router();
const PostModel = require("../models/Post.model");
const CommentModel = require("../models/Comment.model");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  res.json("comments is good in here");
});

// Creating a comment
router.post("/:postId", async (req, res, next) => {
  const newPost = await CommentModel(req.body);
  try {
    await newPost.save();
    res.status(200).json("UnifyU comment Created");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Getting a comment
router.get("/:postId", async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await CommentModel.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Updating a comment
router.put("/:postId", async (req, res, next) => {
  const commentId = req.params.postId;
  const { userId } = req.body;
  try {
    const comment = await CommentModel.findById(commentId);
    if (comment.userId === userId) {
      await CommentModel.updateOne({ $set: req.body });
      res.status(200).json("UnifyU Comment Updated");
    } else {
      res.status(403).json("Action Forbidden, Please Update Only your Comments");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Deleting a comment
router.delete("/:postId", async (req, res, next) => {
  const commentId = req.params.postId;
  const { userId } = req.body;
  try {
    const deleteComment = await CommentModel.findById(commentId);
    if (deleteComment.userId === userId) {
      await deleteComment.deleteOne();
      res.status(200).json("UnifyU Comment Deleted");
    } else {
      res.status(403).json("Action Forbidden, Please Delete Only Your Comments");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Getting timeline comments
router.get("/:postId/timeline", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const currentUserComment = await CommentModel.find({ userId: userId });
    const followingComment = await CommentModel.find({ userId: { $in: userId.following } });
    const timelinePosts = currentUserComment.concat(followingComment).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    res.status(200).json(timelinePosts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;