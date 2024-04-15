const express = require("express");
const JwtVerify = require("../middleware/jwtToken");
const multer = require("multer");

const studentRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/staff/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.fieldname === "contract_pdf" &&
    file.mimetype === "application/pdf"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // Limit file size to 5MB
  },
});

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
  .route("/getleadbyid/:id")
  .get(JwtVerify.validateToken, studentcontroller.getLeadById);

studentRoute
  .route("/editstudent/:id")
  .put(
    upload.fields([{ name: "upload_document", maxCount: 1 }]),
    JwtVerify.validateToken,
    studentcontroller.updateStudent
  );

studentRoute
  .route("/deletestudent/:id")
  .delete(JwtVerify.validateToken, studentcontroller.deleteStudent);

module.exports = studentRoute;
