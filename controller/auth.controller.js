const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const transporter = require('../config/emailConfig');
const saltRounds = 10;
const messages = require("../constant/message");

exports.login_user = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;

  User.find({}).then((foundLeadStatus) => {
    console.log("foundLeadStatus :", foundLeadStatus);
  });

  User.findOne({ email: email })
    .then((foundUser) => {
      user = foundUser;
      if (user) {
        if (user.user_status === true) {
          return bcrypt.compare(password, user.password);
        } else {
          res.json({
            response: false,
            message: messages.ACCOUNT_BLOCKED,
          });
        }
      } else {
        res.json({
          response: false,
          message: messages.INVALID_EMAIL_PASSWORD,
        });
      }
    })
    .then((match) => {
      if (match) {
        const payload = { user: user.email };
        const options = { expiresIn: "12h" };
        const secret = "loginJWTTokenBaseVerification";
        const token = jwt.sign(payload, secret, options);

        res.json({
          response: true,
          data: user,
          message: messages.LOGIN_SUCCESS,
          token: token,
        });
      } else {
        res.json({
          response: false,
          message: messages.INVALID_PASSWORD,
        });
      }
    })
    .catch((error) => {
      return next(error);
    });
};

exports.register = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.user_name;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      return res.json({
        response: false,
        message: messages.EMAIL_EXIST,
      });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const UserData = {
      user_name: username,
      email: email,
      password: hash,
      role: "staff",
      user_status: true,
    };

    const createdUser = await User.create(UserData);

    const payload = { user: email };
    const options = { expiresIn: 60 * 60 };
    const secret = "loginJWTTokenBaseVerification";
    const token = jwt.sign(payload, secret, options);

    res.json({
      response: true,
      data: createdUser,
      message: messages.REGISTER_SUCCESS,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};

exports.forgot_password = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email: email })
    .then(async (foundUser) => {
      if (foundUser) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const mailOptions = {
          from: "zeel129patel@gmail.com",
          to: "cifeucreifesa-7931@yopmail.com",
          subject: "Test Email",
          text: `This is OTP is for change password ${randomNumber}`,
        };
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.error(error);
          } else {
            const updatedData = {
              loginotp: randomNumber,
            };
            await User.findOneAndUpdate({ email: email }, updatedData, {
              new: false,
            });
            res.json({
              response: true,
              message: messages.OTP_SEND,
            });
          }
        });
      } else {
        res.json({
          response: false,
          message: messages.INVALID_EMAIL,
        });
      }
    })
    .catch((error) => {
      return next(error);
    });
};

exports.verify_otp = (req, res, next) => {
  const otp = req.body.otp;
  User.findOne({ email: req.body.email, loginotp: { $ne: null } })
    .then(async (foundUser) => {
      if (foundUser) {
        User.findOne({ loginotp: otp })
          .then(async (foundotp) => {
            if (foundotp) {
              const updatedData = {
                loginotp: "",
              };
              await User.findOneAndUpdate(
                { email: req.body.email },
                updatedData,
                { new: false }
              );
              res.json({
                response: true,
                message: messages.OTP_VERIFY,
              });
            } else {
              res.json({
                response: false,
                message: messages.INVALID_OTP,
              });
            }
          })
          .catch((error) => {
            return next(error);
          });
      } else {
        res.json({
          response: false,
          message: messages.RESEND_OTP,
        });
      }
    })
    .catch((error) => {
      return next(error);
    });
};

exports.reset_password = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(async (foundUser) => {
      if (foundUser) {
        bcrypt.hash(password, saltRounds, async function (err_pwd, hash) {
          if (err_pwd) {
            return next(err_pwd);
          } else {
            const updatedData = {
              password: hash,
            };
            await User.findOneAndUpdate({ email: email }, updatedData, {
              new: false,
            });
            res.json({
              response: true,
              message: messages.RESET_PASSWORD,
            });
          }
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((error) => {
      return next(error);
    });
};

exports.logout = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.destroy(token);
    res.json({ response: true, message: messages.LOGOUT_SUCCESS });
};
