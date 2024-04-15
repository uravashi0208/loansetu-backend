const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const leadFollowUpRoute = express.Router();

const leadFollowUpcontroller = require("../controller/leadFollowUp.controller");

leadFollowUpRoute
  .route("/getleadfollowup/:id")
  .get(JwtVerify.validateToken, leadFollowUpcontroller.getAllLeadFollowUp);

leadFollowUpRoute
  .route("/getleadfollowupNotifiction/:id")
  .get(
    JwtVerify.validateToken,
    leadFollowUpcontroller.getAllLeadFollowUpNotifiction
  );

leadFollowUpRoute
  .route("/addleadfollowup")
  .post(JwtVerify.validateToken, leadFollowUpcontroller.addLeadFollowUp);

module.exports = leadFollowUpRoute;
