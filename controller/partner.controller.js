const User = require("../model/user");
const messages = require("../constant/message");

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

    const insertData = {
      partner_code: req.body.partner_code,
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
    };

    await User.create(insertData);
    res.json({
      response: true,
      message: messages.ADD_PARTNER,
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
      data: courseType,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updatePartner = (req, res) => {
  const _id = req.params.id;
  const course_type_name = req.body.course_type_name;
  //   User.findByIdAndUpdate(_id, {
  //     course_type_name: course_type_name,
  //   })
  //     .then((coursetype) => {
  //       if (!coursetype) {
  //         res.json({ response: false, message: messages.NO_DATA_FOUND });
  //       } else {
  //         res.json({
  //           response: true,
  //           data: coursetype,
  //           message: messages.UPDATE_PARTNER,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       res.json({ response: false, errors: error });
  //     });
};
