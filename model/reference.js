const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Reference = new Schema(
  {
    reference_name: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Student",
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
    collection: "reference",
  }
);

module.exports = mongoose.model("Reference", Reference);
