const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const studentRoute = express.Router();

const studentcontroller = require("../controller/student.controller");

studentRoute
  .route("/getstudent/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllStudent);

studentRoute
  .route("/getlead/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllLead);

studentRoute
  .route("/addstudent")
  .post(JwtVerify.validateToken, studentcontroller.addStudent);

studentRoute
  .route("/getstudentbyid/:id")
  .get(JwtVerify.validateToken, studentcontroller.getStudentById);

studentRoute
  .route("/editstudent/:id")
  .put(JwtVerify.validateToken, studentcontroller.updateStudent);

studentRoute
  .route("/deletestudent/:id")
  .delete(JwtVerify.validateToken, studentcontroller.deleteStudent);

module.exports = studentRoute;
