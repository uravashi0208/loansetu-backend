const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const partnerRoute = express.Router();

const partnercontroller = require("../controller/partner.controller");

partnerRoute
  .route("/getallPartner")
  .get(JwtVerify.validateToken, partnercontroller.getAllPartner);

partnerRoute
  .route("/addpartner")
  .post(JwtVerify.validateToken, partnercontroller.addPartner);

partnerRoute
  .route("/getpartnerbyid/:id")
  .get(JwtVerify.validateToken, partnercontroller.getPartnerById);

partnerRoute
  .route("/editpartner/:id")
  .put(JwtVerify.validateToken, partnercontroller.updatePartner);

partnerRoute
  .route("/deletepartner/:id")
  .delete(JwtVerify.validateToken, partnercontroller.deletePartner);

module.exports = partnerRoute;
