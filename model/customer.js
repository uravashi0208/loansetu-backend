const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Customer = new Schema(
  {
    student_name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Branchlocation",
    },
    university: {
      type: Schema.Types.ObjectId,
      ref: "University",
    },
    course_name: {
      type: String,
    },
    course_type: {
        type: Schema.Types.ObjectId,
        ref: "CourseType",
    },
    last_study: {
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
    father_name: {
      type: String,
    },
    father_phone: {
      type: String,
    },
    address: {
      type: String,
    },
    university: {
      type: Schema.Types.ObjectId,
      ref: "Branchlocation",
    },
    company_email: {
      type: String,
    },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("User", User);
