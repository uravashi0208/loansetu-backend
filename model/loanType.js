const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LoanType = new Schema(
  {
    loan_type: {
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
    collection: "loantype",
  }
);

module.exports = mongoose.model("LoanType", LoanType);
