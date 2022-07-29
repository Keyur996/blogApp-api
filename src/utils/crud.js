"use strict";

const asyncHandler = require("express-async-handler");
const ErrorResponse = require("./errorResponse");
const APIFeatures = require("./apiFeature");
const _ = require("lodash");

exports.deleteOne = (Model) =>
   asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
         return next(new ErrorResponse("No document found with that ID", 404));
      }

      res.status(204).json({
         success: true,
         data: null,
      });
   });

exports.updateOne = (Model) =>
   asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });

      if (!doc) {
         return next(new ErrorResponse("No document found with that ID", 404));
      }

      res.status(200).json({
         success: true,
         data: doc,
      });
   });

exports.createOne = (Model) =>
   asyncHandler(async (req, res, next) => {
      const doc = await Model.create(req.body);

      res.status(201).json({
         success: true,
         data: doc,
      });
   });

exports.getOne = (Model, popOptions) =>
   asyncHandler(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
         return next(new ErrorResponse("No document found with that ID", 404));
      }

      res.status(200).json({
         success: true,
         data: doc,
      });
   });

exports.getAll = (Model, popOptions) =>
   asyncHandler(async (req, res, next) => {
      let filter = {};
      let features = new APIFeatures(Model.find(filter), req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate();
      if (popOptions) {
         features.query = features.query.populate(popOptions);
      }
      const [doc, count] = await Promise.all([
         features.query,
         Model.count(features.pureQuery),
      ]);
      res.status(200).json({
         success: true,
         results: count,
         data: doc,
      });
   });
