const { transporter } = require("../config/emailConfig");
const User = require("../model/user");
const StaffPermission = require("../model/staffpermission");
const messages = require("../constant/message");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

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
          message: messages.PROFILE_UPDATE,
          data: foundUser,
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

exports.add_staff = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingUser) {
      return res.json({
        response: false,
        message: messages.ALREADY_EXIST,
      });
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const updatedData = {
      user_name: req.body.first_name + " " + req.body.last_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
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

    const staffData = await User.create(updatedData);

    const permissiondata = {
      staff_id: staffData._id,
    };
    await StaffPermission.create(permissiondata);
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
            message: messages.ADD_STAFF,
          });
        }
      });
    }
    res.json({
      response: true,
      message: messages.ADD_STAFF,
    });
  } catch (error) {
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
          message: messages.NO_DATA_FOUND,
        });
      }
    });
};

exports.deletestaff = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedSatff = await User.findByIdAndDelete(_id);
    if (!deletedSatff) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_STAFF,
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
        .json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: staff,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateStaff = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const _id = req.params.id;
  User.findByIdAndUpdate(_id, {
    user_name: req.body.first_name + " " + req.body.last_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash,
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
  })
    .then((staffdata) => {
      if (!staffdata) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: staffdata,
          message: messages.UPDATE_STAFF,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};

// Staff Permission
exports.getstaffpermissionById = async (req, res) => {
  try {
    const staffId = req.params.id;
    const staffpermission = await StaffPermission.findOne({
      staff_id: staffId,
    });
    if (!staffpermission) {
      return res.json({
        response: false,
        message: messages.NO_DATA_FOUND,
      });
    }
    res.json({
      response: true,
      data: staffpermission,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateStaffPermission = (req, res) => {
  const staffId = req.params.id;
  const { permissions } = req.body;
  StaffPermission.findOneAndUpdate(
    { staff_id: staffId },
    {
      $set: { permissions: Object.values(permissions) },
    },
    { new: true }
  )
    .then((staffpermissiondata) => {
      if (!staffpermissiondata) {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      } else {
        res.json({
          response: true,
          data: staffpermissiondata,
          message: messages.UPDATE_STAFF_PERMISSION,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};