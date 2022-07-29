"use strict";

const app = require("./app");
require("dotenv").config({ path: "./src/config/config.env" });
const dbConnect = require("./utils/db");

const start = async () => {
   try {
      await dbConnect();

      const port = process.env.PORT || 3001;

      app.listen(port, () => {
         console.log(`Server is Running on ${port}`);
      });
   } catch (err) {
      console.log(`Something Went Wrong`, err);
   }
};

module.exports = start;
