const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema(
  {
    assigne_staff: {
      type: String,
    },
    student_name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    university: {
      type: String,
    },
    course_name: {
      type: String,
    },
    course_type: {
      type: String,
    },
    last_study: {
      type: String,
    },
    exam: {
      type: String,
    },
    exam_core: {
      type: String,
    },
    job: {
      type: Boolean,
    },
    business: {
      type: Boolean,
    },
    retired: {
      type: Boolean,
    },
    monthlySalary: {
      type: String,
    },
    salaryInCash: {
      type: Boolean,
    },
    salaryInBank: {
      type: Boolean,
    },
    designation: {
      type: String,
    },
    bussinessline: {
      type: String,
    },
    gst: {
      type: Boolean,
    },
    ssi: {
      type: Boolean,
    },
    professional_tax: {
      type: Boolean,
    },
    gumastadhara_licence: {
      type: Boolean,
    },
    bussinessaccountyes: {
      type: Boolean,
    },
    bussinessaccountno: {
      type: Boolean,
    },
    loanfacilityyes: {
      type: Boolean,
    },
    loanfacilityno: {
      type: Boolean,
    },
    loanamount: {
      type: String,
    },
    emi: {
      type: String,
    },
    otherearningmember: {
      type: String,
    },
    propertyyes: {
      type: Boolean,
    },
    propertyno: {
      type: Boolean,
    },
    house: {
      type: Boolean,
    },
    flats: {
      type: Boolean,
    },
    shop: {
      type: Boolean,
    },
    plot: {
      type: Boolean,
    },
    other: {
      type: Boolean,
    },
    marketvalue: {
      type: String,
    },
    otherpropertyname: {
      type: String,
    },
    consultantname: {
      type: String,
    },
    refrenceothername: {
      type: String,
    },
    fbinsta: {
      type: Boolean,
    },
    consultant: {
      type: Boolean,
    },
    refrenceother: {
      type: Boolean,
    },
    agreeconditions: {
      type: Boolean,
    },
    education: {
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
    isAssignee: {
      type: Boolean,
    },
    isCustomer: {
      type: Boolean,
    },
    remark: {
      type: String,
    },
    isLead: {
      type: Boolean,
    },
    loantype: {
      type: String,
    },
    city: {
      type: String,
    },
    isLead: {
      type: Boolean,
    },
    loantype: {
      type: String,
    },
  },
  {
    collection: "student",
  }
);

module.exports = mongoose.model("Student", Student);
