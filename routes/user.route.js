const express = require('express');
const { validate } = require('../middleware/validation');
const app = express();
const JwtVerify = require('../middleware/jwtToken');

const userRoute = express.Router();

const usercontroller = require('../controller/user.controller');

userRoute.route('/updateprofile').post(JwtVerify.validateToken, validate, usercontroller.update_profile);

userRoute.route('/addstaff').post(JwtVerify.validateToken, usercontroller.add_staff);

userRoute.route('/getstaff').get(JwtVerify.validateToken, usercontroller.getAllStaff);

module.exports = userRoute;