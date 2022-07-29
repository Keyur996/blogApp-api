"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const uniquePlugin = require("mongoose-unique-validator");

// (firstname, lastname, email, phone, dob, isActive)
const userSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: [true, "Please provide firstname"],
   },
   lastname: {
      type: String,
      required: [true, "Please provide lastname"],
   },
   email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: [validator.default.isEmail, "Please Provide valid Email"],
   },
   phone: {
      type: Number,
      required: [true, "Please Provide phone"],
   },
   dob: {
      type: Date,
      required: [true, "Please Provide BirthDate"],
   },
   isActive: {
      type: Boolean,
      default: true,
   },
});

userSchema.plugin(uniquePlugin);

userSchema.virtual("posts", {
   ref: "Post",
   foreignField: "user",
   localField: "_id",
});

module.exports = mongoose.model("User", userSchema);
