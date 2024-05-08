const Branchlocation = require("../model/branchlocation");
const City = require("../model/city");
const messages = require("../constant/message");

exports.getAllBranchLocation = (req, res, next) => {
  Branchlocation.find({})
    .sort({ createdAt: -1 })
    .then((foundBranchLocation) => {
      if (foundBranchLocation) {
        res.json({
          response: true,
          data: foundBranchLocation,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    });
};

exports.addBranchLocation = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingLocation = await Branchlocation.findOne({
      location_name: { $regex: new RegExp(req.body.location_name, "i") },
    });

    if (existingLocation) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }

    const updatedData = {
      location_name: req.body.location_name,
      branch_address: req.body.branch_address,
      branch_pincode: req.body.branch_pincode,
      branch_email: req.body.branch_email,
      branch_city: req.body.branch_city,
      status: req.body.status,
    };

    await Branchlocation.create(updatedData);
    res.json({
      response: true,
      message: messages.ADD_LOCATION,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteBranchLocation = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedLocation = await Branchlocation.findByIdAndDelete(_id);
    if (!deletedLocation) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_LOCATION,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getBranchLocationById = async (req, res) => {
  try {
    const _id = req.params.id;
    const branchlocation = await Branchlocation.findById(_id);
    if (!branchlocation) {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: branchlocation,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateBranchLocation = (req, res) => {
  const _id = req.params.id;
  const location_name = req.body.location_name;
  const status = req.body.status;
  Branchlocation.findByIdAndUpdate(_id, {
    location_name: location_name,
    branch_city: req.body.branch_city,
    status: status,
  })
    .then((category) => {
      if (!category) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: category,
          message: messages.UPDATE_LOCATION,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};

exports.getAllCity = (req, res, next) => {
  City.find({})
    .sort({ createdAt: -1 })
    .then((foundCity) => {
      if (foundCity) {
        res.json({
          response: true,
          data: foundCity,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    });
};