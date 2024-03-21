const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LeadStatus = new Schema(
  {
    lead_status: {
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
    collection: "leadstatus",
  }
);

module.exports = mongoose.model("LeadStatus", LeadStatus);
