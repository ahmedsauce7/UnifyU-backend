// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, ref: "Post" },
  password: { type: String, required: true },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  profilePicture: { type: String },
  coverPicture: { type: String },
  followers: [] ,
  following: [],
},
  {timestamps: true}
);

module.exports = model("User", userSchema);

