const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User"},
        firstName: { type: String},
        lastName: { type: String},
        location: String,
        description: String,
        picture: String,
        userPicturePath: String,
        likes: [],
        comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
      },
      { timestamps: true }
    );
    
    module.exports = model("Post", postSchema);