const router = require("express").Router();
const PostModel = require("../models/Post.model");
const UserModel = require("../models/User.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

router.get("/", (req, res, next) => {
  res.json("post is good in here");
});

//creating a new post
router.post("/", async (req, res, next) => {
  const newPost = await PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).json("UnifyU Post Created");
  } catch (error) {
    res.status(500).json(error);
  }
});

//getting a post
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//updating a post
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("UnifyU Post Updated");
    } else {
      res.status(403).json("Action Forbidden, Please Update Only your Posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//deleting a post
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const deletePost = await PostModel.findById(id);
    if (deletePost.userId === userId) {
      await deletePost.deleteOne({ $set: req.body });
      res.status(200).json("UnifyU Post Deleted");
    } else {
      res.status(403).json("Action Forbidden, Please Update Only your Posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//liking and unliking a post
router.put("/:id/like", async (req, res, next) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const likePost = await PostModel.findById(id);
    if (!likePost.likes.includes(userId)) {
      await likePost.updateOne({ $push: { likes: userId } });
      res.status(200).json("UnifyU Post Liked");
    } else {
      await likePost.updateOne({ $pull: { likes: userId } });
      res.status(200).json("UnifyU Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//getting timeline posts
router.get("/:id/timeline", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b) => {
      return b.createdAt - a.createdAt;
    })
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
