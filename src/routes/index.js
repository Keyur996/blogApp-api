"use strict";

const uploader = require("./../utils/uploader");
const path = require("path");
const _ = require("lodash");

function routes(app) {
   app.post("/upload", uploader.array("files", 10), (req, res, next) => {
      const files = _.map(req.files || [], (_file) => {
         return `${req.protocol}://${req.headers.host}/file/${_file.filename}`;
      });
      return res.status(200).json({
         success: true,
         files: files,
      });
   });

   app.get("/file/:fileName", (req, res, next) => {
      const uploadDirPath = path.join(process.cwd(), `/uploads/${req.params.fileName}`);
      res.download(uploadDirPath, req.params.fileName, (err) => {
         if (err) {
            console.log("Something Went Wrong file downloading file." + err);
         }
      });
   });

   app.use("/api/users", require("./users/users.route"));
   app.use("/api/posts", require("./posts/posts.route"));
}

module.exports = routes;
