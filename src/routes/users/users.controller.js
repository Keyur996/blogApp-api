"use strict";

const crud = require("./../../utils/crud");
const User = require("./users.model");

module.exports = {
   createUser: crud.createOne(User),
   updateUser: crud.updateOne(User),
   deleteUser: crud.deleteOne(User),
   getOneUser: crud.getOne(User),
   getAllUsers: crud.getAll(User),
};
