const { transporter } = require("../config/emailConfig");
const User = require("../model/user");

exports.update_profile = (req, res, next) => {
  User.findOne({ _id: req.body.userId })
    .then(async (foundUser) => {
      if (foundUser) {
        const updatedData = {
          email: req.body.email,
          user_name: req.body.user_name,
        };
        await User.findOneAndUpdate({ _id: req.body.userId }, updatedData, {
          new: false,
        });
        res.json({
          response: true,
          message: "Profile Updated.",
          data: foundUser,
        });
      } else {
        res.json({
          response: false,
          message: "User not found.",
        });
      }
    })
    .catch((error) => {
      return next(error);
    });
};

exports.add_staff = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingUser) {
      return res.json({
        response: false,
        message: "Email or phone number already exists.",
      });
    }

    const updatedData = {
      user_name: req.body.first_name + " " + req.body.last_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.isAdmin === true ? "Admin" : "staff",
      user_status: true,
      isAdmin: req.body.isAdmin,
      isStaff: req.body.isStaff,
      isSendWelcomeMail: req.body.isSendWelcomeMail,
      rate: req.body.rate,
      phone: req.body.phone,
      staff_team: req.body.staff_team,
      father_name: req.body.father_name,
      father_phone: req.body.father_phone,
      address: req.body.address,
      pan_number: req.body.pan_number,
      aadhar_number: req.body.aadhar_number,
      uan_number: req.body.uan_number,
      branchlocation: req.body.branchlocation,
      company_email: req.body.company_email,
      emailsignature: req.body.emailsignature,
      image: req.files.image ? req.files.image[0].filename : "",
      pan_image: req.files.pan_image[0].filename,
      aadhar_image: req.files.aadhar_image[0].filename,
      contract_pdf: req.files.contract_pdf[0].filename,
    };

    await User.create(updatedData);

    if (req.body.emailsignature === true) {
      const mailOptions = {
        from: "zeel129patel@gmail.com",
        to: "cifeucreifesa-7931@yopmail.com",
        subject: "Test Email",
        text: "This is registration confirmation mail.",
      };
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error(error);
        } else {
          res.json({
            response: true,
            message: "Staff added succesfully.",
          });
        }
      });
    }
    res.json({
      response: true,
      message: "Staff added succesfully.",
    });
  } catch (error) {
    console.log("error :", error);
    return next(error);
  }
};

exports.getAllStaff = (req, res, next) => {
  User.find({ role: "staff" })
    .sort({ createdAt: -1 })
    .then((foundUser) => {
      if (foundUser) {
        res.json({
          response: true,
          data: foundUser,
        });
      } else {
        res.json({
          response: false,
          message: "No data found",
        });
      }
    });
};

exports.deletestaff = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedSatff = await User.findByIdAndDelete(_id);
    if (!deletedSatff) {
      res.json({ response: false, message: "Staff not found." });
    } else {
      res.json({
        response: true,
        message: "Successfully deleted Staff.",
      });
    }
  } catch (error) {
    console.log("error :", error);
    return next(error);
  }
};

exports.getstaffById = async (req, res) => {
  try {
    const _id = req.params.id;
    const staff = await User.findById(_id);
    if (!staff) {
      return res
        .status(404)
        .json({ response: false, message: "Staff not found." });
    }
    res.json({
      response: true,
      data: staff,
      message: "Successfully get staff.",
    });
  } catch (error) {
    res.status(500).json({ response: false, errors: error });
  }
};
