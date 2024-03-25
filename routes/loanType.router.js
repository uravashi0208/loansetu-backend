const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const loanTypeRoute = express.Router();

const loanTypecontroller = require("../controller/loanType.controller");

loanTypeRoute
  .route("/getloantype")
  .get(JwtVerify.validateToken, loanTypecontroller.getAllLoanType);

loanTypeRoute
  .route("/addloantype")
  .post(JwtVerify.validateToken, loanTypecontroller.addLoanType);

loanTypeRoute
  .route("/getloantypebyid/:id")
  .get(JwtVerify.validateToken, loanTypecontroller.getLoanTypeById);

loanTypeRoute
  .route("/editloantype/:id")
  .put(JwtVerify.validateToken, loanTypecontroller.updateLoanType);

loanTypeRoute
  .route("/deleteloantype/:id")
  .delete(JwtVerify.validateToken, loanTypecontroller.deleteLoanType);

module.exports = loanTypeRoute;
