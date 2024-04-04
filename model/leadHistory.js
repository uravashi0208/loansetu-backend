const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LeadHistory = new Schema(
  {
    staff_id: {
      type: String,
    },
    student_id: {
      type: String,
    },
    message: {
      type: String,
    },
    statusmessage: {
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
    collection: "leadhistory",
  }
);

module.exports = mongoose.model("LeadHistory", LeadHistory);
