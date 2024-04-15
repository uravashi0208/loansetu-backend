const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LeadFollowUp = new Schema(
  {
    createdby: {
      type: String,
    },
    student_id: {
      type: String,
    },
    current_followup_date: {
      type: String,
    },
    current_followup_comment: {
      type: String,
    },
    next_followup_date: {
      type: String,
    },
    next_followup_comment: {
      type: String,
    },
    followup_place: {
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
    collection: "leadfollowup",
  }
);

module.exports = mongoose.model("LeadFollowUp", LeadFollowUp);
