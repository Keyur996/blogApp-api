"use strict";

const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
   destination: path.join(process.cwd(), "/uploads"),
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith("image")) {
      cb(null, true);
   } else {
      cb(new AppError("Not an image! Please upload only images.", 400), false);
   }
};

const uploader = multer({
   storage: multerStorage,
   fileFilter: multerFilter,
});

module.exports = uploader;
