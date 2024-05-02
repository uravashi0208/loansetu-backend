const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LeadActivityLog = new Schema(
  {
    staff_id: {
      type: String,
    },
    student_id: {
      type: String,
    },
    activity_log_details: {
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
    collection: "leadactivitylog",
  }
);

module.exports = mongoose.model("LeadActivityLog", LeadActivityLog);
