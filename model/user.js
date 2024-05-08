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
      type: String,
    },
    company_email: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },

    partner_code: {
      type: String,
    },
    company_name: {
      type: String,
    },
    authorised_person_name: {
      type: String,
    },
    constitution: {
      type: String,
    },
    age: {
      type: String,
    },
    alternate_contact_number: {
      type: String,
    },
    present_occupation: {
      type: String,
    },
    current_employement: {
      type: String,
    },
    qualification: {
      type: String,
    },
    language_known: {
      type: String,
    },
    reference_name: {
      type: String,
    },
    reference_contact_number: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    bank_ifsc_code: {
      type: String,
    },
    branch_name: {
      type: String,
    },
    account_number: {
      type: String,
    },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model('User', User);