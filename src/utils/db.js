"use strict";

const mongoose = require("mongoose");

const dbConnect = async () => {
   await mongoose.connect(process.env.DB_URL);
   console.log("DB connected Successfully !!");
};

module.exports = dbConnect;
