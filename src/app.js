"use strict";

const express = require("express");
const hpp = require("hpp");
const morgan = require("morgan");
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");
const errorHandler = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../uploads")));

app.use(cors());

app.use(morgan("dev"));
app.use(hpp());
app.use(xss());
// app.use(helmet());

routes(app);

app.use(errorHandler);

module.exports = app;
