const express = require("express");
const { validate } = require("../middleware/validation");
const JwtVerify = require("../middleware/jwtToken");

const branchLocationRoute = express.Router();

const branchLocationcontroller = require("../controller/branchlocation.controller");

// branchLocationRoute
//   .route("/updateprofile")
//   .post(JwtVerify.validateToken, validate, branchLocationcontroller.update_profile);

branchLocationRoute
  .route("/addbranchlocation")
  .post(JwtVerify.validateToken, branchLocationcontroller.addBranchLocation);

branchLocationRoute
  .route("/getbranchlocation")
  .get(JwtVerify.validateToken, branchLocationcontroller.getAllBranchLocation);

branchLocationRoute
  .route("/delete-location/:id")
  .delete(
    JwtVerify.validateToken,
    branchLocationcontroller.deleteBranchLocation
  );

branchLocationRoute
  .route("/getlocationbyid/:id")
  .get(JwtVerify.validateToken, branchLocationcontroller.getBranchLocationById);

branchLocationRoute
  .route("/editbranchlocation/:id")
  .put(JwtVerify.validateToken, branchLocationcontroller.updateBranchLocation);
module.exports = branchLocationRoute;
