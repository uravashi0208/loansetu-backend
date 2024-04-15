const express = require("express");
const JwtVerify = require("../middleware/jwtToken");

const customerRoute = express.Router();

const customercontroller = require("../controller/customer.controller");

customerRoute
  .route("/getallcustomer/:id")
  .get(JwtVerify.validateToken, customercontroller.getAllCustomer);

module.exports = customerRoute;
