"use strict";

const express = require("express");

const userController = require("./users.controller");

const router = express.Router();

router.route("").get(userController.getAllUsers).post(userController.createUser);

router
   .route("/:id")
   .get(userController.getOneUser)
   .patch(userController.updateUser)
   .delete(userController.deleteUser);

module.exports = router;
