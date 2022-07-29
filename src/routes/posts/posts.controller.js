"use strict";

const crud = require("./../../utils/crud");
const Post = require("./posts.model");

module.exports = {
   createPost: crud.createOne(Post),
   updatePost: crud.updateOne(Post),
   deletePost: crud.deleteOne(Post),
   getAllPosts: crud.getAll(Post, { path: "user", select: "-__v" }),
   getOnePost: crud.getOne(Post, { path: "user", select: "-__v" }),
};
