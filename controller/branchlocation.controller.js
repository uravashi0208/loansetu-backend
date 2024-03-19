const { transporter } = require("../config/emailConfig");
const Branchlocation = require("../model/branchlocation");

exports.getAllBranchLocation = (req, res, next) => {
  Branchlocation.find({}).then((foundBranchLocation) => {
    if (foundBranchLocation) {
      res.json({
        response: true,
        data: foundBranchLocation,
      });
    } else {
      res.json({
        response: false,
        message: "No data found",
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
        message: "Branch Location already exists.",
      });
    }

    const updatedData = {
      location_name: req.body.location_name,
      status: req.body.status,
    };

    await Branchlocation.create(updatedData);
    res.json({
      response: true,
      message: "Location added succesfully.",
    });
  } catch (error) {
    console.log("error :", error);
    return next(error);
  }
};

exports.deleteBranchLocation = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedLocation = await Branchlocation.findByIdAndDelete(_id);
    if (!deletedLocation) {
      res.json({ response: false, message: "Location not found." });
    } else {
      res.json({
        response: true,
        message: "Successfully deleted branch location.",
      });
    }
  } catch (error) {
    console.log("error :", error);
    return next(error);
  }
};

exports.getBranchLocationById = async (req, res) => {
  try {
    const _id = req.params.id;
    const branchlocation = await Branchlocation.findById(_id);
    if (!branchlocation) {
      return res
        .status(404)
        .json({ response: false, message: "Location not found." });
    }
    res.json({
      response: true,
      data: branchlocation,
      message: "Successfully get location.",
    });
  } catch (error) {
    res.status(500).json({ response: false, errors: error });
  }
};

exports.updateBranchLocation = (req, res) => {
  const _id = req.params.id;
  const location_name = req.body.location_name;
  const status = req.body.status;
  Branchlocation.findByIdAndUpdate(_id, {
    location_name: location_name,
    status: status,
  })
    .then((category) => {
      if (!category) {
        res
          .status(404)
          .json({ response: false, message: "Location not found." });
      } else {
        res.json({
          response: true,
          data: category,
          message: "Location updated successfully.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ response: false, errors: error });
    });
};
