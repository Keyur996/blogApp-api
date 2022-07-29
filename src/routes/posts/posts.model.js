"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
// (title, description (200 char limit), image (can upload multiple), tags, user (select from ddl of users))
const postSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Please provide title"],
   },
   description: {
      type: String,
      maxLength: [200, "Please enter upto 200 characters"],
      required: [true, "Please provide lastname"],
   },
   images: [
      {
         type: String,
         minLength: [1, "please provide image"],
      },
   ],
   tags: [
      {
         type: String,
         required: [true, "Please Provide tags"],
      },
   ],
   user: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide user"],
      ref: "User",
   },
});

module.exports = mongoose.model("Post", postSchema);
