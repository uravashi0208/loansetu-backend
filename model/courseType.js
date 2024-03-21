const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CourseType = new Schema(
  {
    course_type_name: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    upadatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "coursetype",
  }
);

module.exports = mongoose.model("CourseType", CourseType);
