const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const leadStatusRoute = express.Router();

const leadStatuscontroller = require("../controller/leadstatus.controller");

leadStatusRoute
  .route("/getleadstatus")
  .get(JwtVerify.validateToken, leadStatuscontroller.getAllLeadStatus);

leadStatusRoute
  .route("/addleadstatus")
  .post(JwtVerify.validateToken, leadStatuscontroller.addLeadStatus);

leadStatusRoute
  .route("/getleadstatusbyid/:id")
  .get(JwtVerify.validateToken, leadStatuscontroller.getLeadStatusById);

leadStatusRoute
  .route("/editleadstatus/:id")
  .put(JwtVerify.validateToken, leadStatuscontroller.updateLeadStaus);

leadStatusRoute
  .route("/deleteleadstatus/:id")
  .delete(JwtVerify.validateToken, leadStatuscontroller.deleteLeadStatus);

module.exports = leadStatusRoute;
