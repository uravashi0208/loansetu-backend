const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema(
  {
    user_name: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    user_status: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isSendWelcomeMail: {
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
    loginotp: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    emailsignature: {
      type: String,
    },
    dob: {
      type: String,
    },
    image: {
      type: String,
    },
    staff_team: {
      type: String,
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
    pan_number: {
      type: String,
    },
    aadhar_number: {
      type: String,
    },
    uan_number: {
      type: String,
    },
    pan_image: {
      type: String,
    },
    aadhar_image: {
      type: String,
    },
    contract_pdf: {
      type: String,
    },
    branchlocation: {
      type: Schema.Types.ObjectId,
      ref: "Branchlocation",
    },
    company_email: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female","other"],
      default: "male",
    },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model('User', User);