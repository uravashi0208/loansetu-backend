const user = require("../model/user");
const messages = require("../constant/message");

exports.getAllReference = (req, res, next) => {
  user
    .find({ role: "partner" })
    .sort({ createdAt: -1 })
    .then((foundReference) => {
      if (foundReference) {
        res.json({
          response: true,
          data: foundReference,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    });
};

exports.addReference = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingReference = await user.findOne({
      company_name: { $eq: req.body.reference_name },
    });

    console.log(
      "existingReference :",
      existingReference,
      req.body.reference_name
    );

    if (existingReference) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }

    const latestPartner = await user.findOne(
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

    const partnerCode = req.body.reference_name.substr(0, 4);
    const insertData = {
      partner_code: partnerCode + formattedNumber,
      company_name: req.body.reference_name,
      role: "partner",
      user_status: true,
      isAdmin: false,
      isStaff: false,
    };

    await user.create(insertData);
    res.json({
      response: true,
    });
  } catch (error) {
    return next(error);
  }
};
