const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const universityRoute = express.Router();

const universitycontroller = require("../controller/university.controller");

universityRoute
  .route("/getuniversity")
  .get(JwtVerify.validateToken, universitycontroller.getAllUniversity);

universityRoute
  .route("/getuniversitybycountry/:id")
  .get(JwtVerify.validateToken, universitycontroller.getAllUniversityByCountry);

universityRoute
  .route("/getcountry")
  .get(JwtVerify.validateToken, universitycontroller.getAllCountry);

universityRoute
  .route("/adduniversity")
  .post(JwtVerify.validateToken, universitycontroller.addUniversity);

universityRoute
  .route("/getuniversitybyid/:id")
  .get(JwtVerify.validateToken, universitycontroller.getUniversityById);

universityRoute
  .route("/edituniversity/:id")
  .put(JwtVerify.validateToken, universitycontroller.updateUniversity);

universityRoute
  .route("/deleteuniversity/:id")
  .delete(JwtVerify.validateToken, universitycontroller.deleteUniversity);

module.exports = universityRoute;
