const CourseType = require("../model/courseType");
const messages = require("../constant/message");

exports.getAllCourseType = (req, res, next) => {
  CourseType.find({}).then((foundCourseType) => {
    if (foundCourseType) {
      res.json({
        response: true,
        data: foundCourseType,
      });
    } else {
      res.json({
        response: false,
        message: messages.NO_DATA_FOUND,
      });
    }
  });
};

exports.addCourseType = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingCourseType = await CourseType.findOne({
      course_type_name: { $regex: new RegExp(req.body.course_type_name, "i") },
    });

    if (existingCourseType) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }

    const updatedData = {
      course_type_name: req.body.course_type_name,
    };

    await CourseType.create(updatedData);
    res.json({
      response: true,
      message: messages.ADD_COURSE_TYPE,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteCourseType = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedCourseType = await CourseType.findByIdAndDelete(_id);
    if (!deletedCourseType) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_COURSE_TYPE,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getCourseTypeById = async (req, res) => {
  try {
    const _id = req.params.id;
    const courseType = await CourseType.findById(_id);
    if (!courseType) {
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

exports.updateCourseType = (req, res) => {
  const _id = req.params.id;
  const course_type_name = req.body.course_type_name;
  CourseType.findByIdAndUpdate(_id, {
    course_type_name: course_type_name,
  })
    .then((coursetype) => {
      if (!coursetype) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: coursetype,
          message: messages.UPDATE_COURSE_TYPE,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};
