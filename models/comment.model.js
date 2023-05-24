const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User"  },
    comment: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
