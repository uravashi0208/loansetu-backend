const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const studentRoute = express.Router();

const studentcontroller = require("../controller/student.controller");

studentRoute
  .route("/getstudent/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllStudent);

studentRoute
  .route("/getnewlead/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllNewLead);

studentRoute
  .route("/getprocessinglead/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllProcessingLead);

studentRoute
  .route("/getclosebylead/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllCloseByLead);

studentRoute
  .route("/getconfirmlead/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllConfirmLead);

studentRoute
  .route("/getcancellead/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllCancelLead);

studentRoute
  .route("/getleadhistory/:id")
  .get(JwtVerify.validateToken, studentcontroller.getAllLeadHistory);

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
