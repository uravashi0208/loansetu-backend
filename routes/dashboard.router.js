const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const dashboardReportRoute = express.Router();

const dashboardReportcontroller = require("../controller/dashboardReport.controller");

dashboardReportRoute
  .route("/getAllLeadReport/:id")
  .get(JwtVerify.validateToken, dashboardReportcontroller.getAllLeadReport);

dashboardReportRoute
  .route("/getAllNewLeadReport/:id")
  .get(JwtVerify.validateToken, dashboardReportcontroller.getAllNewLeadReport);

dashboardReportRoute
  .route("/getAllProcessingLeadReport/:id")
  .get(
    JwtVerify.validateToken,
    dashboardReportcontroller.getAllProcessingLeadReport
  );

dashboardReportRoute
  .route("/getAllCancelLeadReport/:id")
  .get(
    JwtVerify.validateToken,
    dashboardReportcontroller.getAllCancelLeadReport
  );

dashboardReportRoute
  .route("/getAllLeadChartReport/:id")
  .get(
    JwtVerify.validateToken,
    dashboardReportcontroller.getAllLeadChartReport
  );

dashboardReportRoute
  .route("/getAllReferenceLead")
  .get(JwtVerify.validateToken, dashboardReportcontroller.getAllReferenceLead);
dashboardReportRoute
  .route("/getReferenceLeadCount")
  .get(
    JwtVerify.validateToken,
    dashboardReportcontroller.getReferenceLeadCount
  );
module.exports = dashboardReportRoute;
