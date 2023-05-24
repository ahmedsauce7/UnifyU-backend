const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User"  },
    commentText: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
