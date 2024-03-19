const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Branchlocation = new Schema(
  {
    location_name: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
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
    collection: "branchlocation",
  }
);

module.exports = mongoose.model("Branchlocation", Branchlocation);
