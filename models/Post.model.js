const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        userId: { type: String, required: true,},
        firstName: { type: String},
        lastName: { type: String},
        location: String,
        description: String,
        picture: String,
        userPicturePath: String,
        likes: [],
        comments: { type: Array,default: []},
      },
      { timestamps: true }
    );
    
    module.exports = model("Post", postSchema);