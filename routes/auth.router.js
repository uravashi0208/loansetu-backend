const express = require('express');
const { authLogin, validate, forgotPassword, verifyOtp, resetPassword, userValidation } = require('../middleware/validation');
const app = express();
const JwtVerify = require('../middleware/jwtToken');

const authRoute = express.Router();

const authcontroller = require('../controller/auth.controller');

authRoute.route('/login').post(authLogin(), validate, authcontroller.login_user);

authRoute.route('/register').post(userValidation(), validate, authcontroller.register);

authRoute.route('/forgot-password').post(forgotPassword(), validate, authcontroller.forgot_password);

authRoute.route('/verify-otp').post(verifyOtp(), validate, authcontroller.verify_otp);

authRoute.route('/reserpassword').post(resetPassword(), validate, authcontroller.reset_password);

authRoute.route('/logout').get(JwtVerify.validateToken, authcontroller.logout);

module.exports = authRoute;