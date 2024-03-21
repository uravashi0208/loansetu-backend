const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const courseTypeRoute = express.Router();

const courseTypecontroller = require("../controller/courseType.controller");

courseTypeRoute
  .route("/getcoursetype")
  .get(JwtVerify.validateToken, courseTypecontroller.getAllCourseType);

courseTypeRoute
  .route("/addcoursetype")
  .post(JwtVerify.validateToken, courseTypecontroller.addCourseType);

courseTypeRoute
  .route("/getcoursetypebyid/:id")
  .get(JwtVerify.validateToken, courseTypecontroller.getCourseTypeById);

courseTypeRoute
  .route("/editcoursetype/:id")
  .put(JwtVerify.validateToken, courseTypecontroller.updateCourseType);

courseTypeRoute
  .route("/deletecoursetype/:id")
  .delete(JwtVerify.validateToken, courseTypecontroller.deleteCourseType);

module.exports = courseTypeRoute;
