const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let City = new Schema(
  {
    city_name: {
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
    collection: "city",
  }
);

module.exports = mongoose.model("City", City);
