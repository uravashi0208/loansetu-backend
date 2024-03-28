const University = require("../model/university");
const messages = require("../constant/message");

exports.getAllUniversity = (req, res, next) => {
  const id = req.params.id;
  University.find({}).then((foundUniversity) => {
    if (foundUniversity) {
      res.json({
        response: true,
        data: foundUniversity,
      });
    } else {
      res.json({
        response: false,
        message: messages.NO_DATA_FOUND,
      });
    }
  });
};

exports.getAllUniversityByCountry = (req, res, next) => {
  const id = req.params.id;
  University.find({ country_name: id }).then((foundUniversity) => {
    if (foundUniversity) {
      res.json({
        response: true,
        data: foundUniversity,
      });
    } else {
      res.json({
        response: false,
        message: messages.NO_DATA_FOUND,
      });
    }
  });
};

exports.getAllCountry = (req, res, next) => {
  University.aggregate([
    { $group: { _id: "$country_name" } },
    { $match: { _id: { $exists: true, $ne: null } } },
  ])
    .then((foundCountries) => {
      if (foundCountries && foundCountries.length > 0) {
        const commonCountries = foundCountries.map((country) => country._id);
        res.json({
          response: true,
          data: commonCountries,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching common countries:", error);
      res.status(500).json({
        response: false,
        message: "Internal server error",
      });
    });
};

exports.addUniversity = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingUniversity = await University.findOne({
      university_name: { $regex: new RegExp(req.body.university_name, "i") },
    });
    if (existingUniversity) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }
    const updatedData = {
      country_name: req.body.country_name,
      university_name: req.body.university_name,
    };
    await University.create(updatedData);
    res.json({
      response: true,
      message: messages.ADD_UNIVERSITY,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteUniversity = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedUniversity = await University.findByIdAndDelete(_id);
    if (!deletedUniversity) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_UNIVERSITY,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const _id = req.params.id;
    const university = await University.findById(_id);
    if (!university) {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: university,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateUniversity = (req, res) => {
  const _id = req.params.id;
  const country_name = req.body.country_name;
  const university_name = req.body.university_name;
  University.findByIdAndUpdate(_id, {
    country_name: country_name,
    university_name: university_name,
  })
    .then((university) => {
      if (!university) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: university,
          message: messages.UPDATE_UNIVERSITY,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};
