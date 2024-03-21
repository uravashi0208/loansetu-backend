const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const branchLocationRoute = express.Router();

const branchLocationcontroller = require("../controller/branchlocation.controller");

branchLocationRoute
  .route("/getbranchlocation")
  .get(JwtVerify.validateToken, branchLocationcontroller.getAllBranchLocation);

branchLocationRoute
  .route("/addbranchlocation")
  .post(JwtVerify.validateToken, branchLocationcontroller.addBranchLocation);

branchLocationRoute
  .route("/getlocationbyid/:id")
  .get(JwtVerify.validateToken, branchLocationcontroller.getBranchLocationById);

branchLocationRoute
  .route("/editbranchlocation/:id")
  .put(JwtVerify.validateToken, branchLocationcontroller.updateBranchLocation);

branchLocationRoute
  .route("/deletelocation/:id")
  .delete(
    JwtVerify.validateToken,
    branchLocationcontroller.deleteBranchLocation
  );

module.exports = branchLocationRoute;
