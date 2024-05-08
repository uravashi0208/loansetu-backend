const express = require('express');
const { validate } = require("../middleware/validation");
const JwtVerify = require("../middleware/jwtToken");
const multer = require("multer");

const userRoute = express.Router();

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
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (
    (file.fieldname === "image" && file.mimetype === "image/jpeg") ||
    (file.fieldname === "pan_image" &&
      allowedMimeTypes.includes(file.mimetype)) ||
    (file.fieldname === "aadhar_image" &&
      allowedMimeTypes.includes(file.mimetype)) ||
    (file.fieldname === "contract_pdf" && file.mimetype === "application/pdf")
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

const usercontroller = require("../controller/user.controller");

userRoute
  .route("/getstaff")
  .get(JwtVerify.validateToken, usercontroller.getAllStaff);

userRoute
  .route("/updateprofile")
  .post(JwtVerify.validateToken, validate, usercontroller.update_profile);

userRoute.route("/addstaff").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pan_image", maxCount: 1 },
    { name: "aadhar_image", maxCount: 1 },
    { name: "contract_pdf", maxCount: 1 },
  ]),
  JwtVerify.validateToken,
  usercontroller.add_staff
);

userRoute
  .route("/deletestaff/:id")
  .delete(JwtVerify.validateToken, usercontroller.deletestaff);

userRoute
  .route("/getstaffbyid/:id")
  .get(JwtVerify.validateToken, usercontroller.getstaffById);

userRoute
  .route("/editstaff/:id")
  .put(JwtVerify.validateToken, usercontroller.updateStaff);

userRoute
  .route("/getstaffpermissionbyid/:id")
  .get(JwtVerify.validateToken, usercontroller.getstaffpermissionById);

userRoute
  .route("/editstaffpermission/:id")
  .put(JwtVerify.validateToken, usercontroller.updateStaffPermission);
module.exports = userRoute;