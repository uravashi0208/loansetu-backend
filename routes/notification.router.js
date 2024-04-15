const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const notificationRoute = express.Router();

const notificationcontroller = require("../controller/notification.controller");

notificationRoute
  .route("/getnotification/:id")
  .get(JwtVerify.validateToken, notificationcontroller.getAllNotification);

  notificationRoute
    .route("/editnotification/:id")
    .put(JwtVerify.validateToken, notificationcontroller.updateNotification);

module.exports = notificationRoute;
