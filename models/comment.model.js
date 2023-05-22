const User = require("./User.model");
const Post = require("./Post.model");

const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: String, required: true },
    commentText: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
