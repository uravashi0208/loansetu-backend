const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const referenceRoute = express.Router();

const referencecontroller = require("../controller/reference.controller");

referenceRoute
  .route("/getreference")
  .get(JwtVerify.validateToken, referencecontroller.getAllReference);

referenceRoute
  .route("/addreference")
  .post(JwtVerify.validateToken, referencecontroller.addReference);

module.exports = referenceRoute;
