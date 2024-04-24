const Reference = require("../model/reference");
const messages = require("../constant/message");

exports.getAllReference = (req, res, next) => {
  Reference.find({}).then((foundReference) => {
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
    const existingReference = await Reference.findOne({
      reference_name: { $regex: new RegExp(req.body.reference_name, "i") },
    });

    if (existingReference) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }

    const updatedData = {
      reference_name: req.body.reference_name,
    };

    await Reference.create(updatedData);
    res.json({
      response: true,
    });
  } catch (error) {
    return next(error);
  }
};
