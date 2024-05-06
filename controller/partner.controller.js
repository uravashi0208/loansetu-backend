const User = require("../model/user");
const messages = require("../constant/message");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { transporter } = require("../config/emailConfig");

exports.getAllPartner = (req, res, next) => {
  User.find({ role: "partner" }).then((foundPartner) => {
    if (foundPartner) {
      res.json({
        response: true,
        data: foundPartner,
      });
    } else {
      res.json({
        response: false,
        message: messages.NO_DATA_FOUND,
      });
    }
  });
};

exports.addPartner = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingPartner = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    if (existingPartner) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const latestPartner = await User.findOne(
      { role: "partner" },
      {},
      { sort: { createdAt: -1 } }
    );
    let oldpartnerCode;
    if (latestPartner && latestPartner.partner_code) {
      const match = latestPartner.partner_code.match(/\d+/);
      if (match) {
        oldpartnerCode = parseInt(match[0]);
      } else {
        // Handle the case where no digits were found in partner_code
        oldpartnerCode = 0;
      }
    } else {
      // Handle the case where latestPartner is null or partner_code is not defined
      odpartnerCode = 0;
    }

    const incrementedNumber = oldpartnerCode + 1;

    let formattedNumber = incrementedNumber.toString();
    if (formattedNumber.length === 1) {
      formattedNumber = "00" + formattedNumber;
    } else if (formattedNumber.length === 2) {
      formattedNumber = "0" + formattedNumber;
    }

    const partnerCode = req.body.company_name.substr(0, 4);
    const insertData = {
      partner_code: partnerCode + formattedNumber,
      company_name: req.body.company_name,
      authorised_person_name: req.body.authorised_person_name,
      constitution: req.body.constitution,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      alternate_contact_number: req.body.alternate_contact_number,
      pan_number: req.body.pan_number,
      email: req.body.email,
      present_occupation: req.body.present_occupation,
      rate: req.body.rate,
      current_employement: req.body.current_employement,
      qualification: req.body.qualification,
      language_known: req.body.language_known,
      reference_name: req.body.reference_name,
      reference_contact_number: req.body.reference_contact_number,
      bank_name: req.body.bank_name,
      branch_name: req.body.branch_name,
      account_number: req.body.account_number,
      role: "partner",
      password: hash,
      user_status: true,
    };

    await User.create(insertData);
    const mailOptions = {
      from: "zeel129patel@gmail.com",
      to: req.body.email,
      subject: "Account Details",
      text: `This is registration confirmation mail. Your account is created and here toue email id and password  Email : ${req.body.email}  PassWord : ${req.body.password}`,
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
      } else {
        res.json({
          response: true,
          message: messages.ADD_PARTNER,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

exports.deletePartner = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedPartner = await User.findByIdAndDelete(_id);
    if (!deletedPartner) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_PARTNER,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const _id = req.params.id;
    const partner = await User.findById(_id);
    if (!partner) {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: partner,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updatePartner = (req, res) => {
  const _id = req.params.id;
  User.findByIdAndUpdate(_id, {
    company_name: req.body.company_name,
    authorised_person_name: req.body.authorised_person_name,
    constitution: req.body.constitution,
    age: req.body.age,
    address: req.body.address,
    phone: req.body.phone,
    alternate_contact_number: req.body.alternate_contact_number,
    pan_number: req.body.pan_number,
    email: req.body.email,
    present_occupation: req.body.present_occupation,
    rate: req.body.rate,
    current_employement: req.body.current_employement,
    qualification: req.body.qualification,
    language_known: req.body.language_known,
    reference_name: req.body.reference_name,
    reference_contact_number: req.body.reference_contact_number,
    bank_name: req.body.bank_name,
    branch_name: req.body.branch_name,
    account_number: req.body.account_number,
    passord: hash,
  })
    .then((partners) => {
      if (!partners) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: partners,
          message: messages.UPDATE_PARTNER,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};
