const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let University = new Schema(
  {
    country_name: {
      type: String,
    },
    university_name: {
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
    collection: "university",
  }
);

module.exports = mongoose.model("University", University);
