const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model")


///Retrieve all comments
router.get("/", async (req, res) => {
    try {
      const comments = await Comment.find().populate("postId userId");
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comments", error });
    }
  });

//Create a new comment
router.get("/", async (req, res) => {
    try {
      const comments = await Comment.find().populate("postId userId");
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving comments", error });
    }
  });

  //Update a comment
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await Comment.findByIdAndUpdate(
        id,
        { $set: { content } },
        { new: true }
      );
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: "Error updating comment", error });
    }
  });

//Delete a comment
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Comment.findByIdAndDelete(id);
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  });

module.exports = router;