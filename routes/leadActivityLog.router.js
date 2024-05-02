const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const leadActivityLogRoute = express.Router();

const leadActivityLogcontroller = require("../controller/leadActivityLog.controller");

leadActivityLogRoute
  .route("/getleadActivityLog/:id")
  .get(
    JwtVerify.validateToken,
    leadActivityLogcontroller.getAllLeadActivityLog
  );

leadActivityLogRoute
  .route("/addleadActivityLog")
  .post(JwtVerify.validateToken, leadActivityLogcontroller.addLeadActivityLog);

module.exports = leadActivityLogRoute;
