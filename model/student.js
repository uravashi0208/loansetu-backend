const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema(
  {
    assigne_staff: {
      type: String,
    },
    relation_with_student: {
      type: String,
    },
    student_name: {
      type: String,
    },
    dob: {
      type: String,
    },
    aadhar_no: {
      type: String,
    },
    pan_no: {
      type: String,
    },
    passport: {
      type: String,
    },
    marital_status: {
      type: String,
    },
    phone: {
      type: Number,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    email: {
      type: String,
    },
    father_full_name: {
      type: String,
    },
    mother_full_name: {
      type: String,
    },
    resident_address: {
      type: String,
    },
    pincode: {
      type: String,
    },
    permanent_address: {
      type: String,
    },
    permanent_pincode: {
      type: String,
    },
    year_in_current_address: {
      type: String,
    },
    reference_name: {
      type: String,
    },
    reference_phone_no: {
      type: String,
    },
    reference_address: {
      type: String,
    },
    loan_amount_required: {
      type: String,
    },
    exam: {
      type: String,
    },
    listening: {
      type: String,
    },
    reading: {
      type: String,
    },
    writing: {
      type: String,
    },
    speaking: {
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
    type_of_employment: {
      type: String,
    },
    company_name: {
      type: String,
    },
    applicant_designation: {
      type: String,
    },
    work_experience: {
      type: String,
    },
    current_work_experience: {
      type: String,
    },
    bussiness_address: {
      type: String,
    },
    bussiness_pincode: {
      type: String,
    },
    net_monthly_income: {
      type: String,
    },
    other_income: {
      type: String,
    },
    gold: {
      type: String,
    },
    land: {
      type: String,
    },
    life_insurance_policy: {
      type: String,
    },
    property: {
      type: String,
    },
    shares: {
      type: String,
    },
    rent_income: {
      type: String,
    },
    bank_balance: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    account_number: {
      type: String,
    },
    ifsc_code: {
      type: String,
    },
    currently_running_loan_bank: {
      type: String,
    },
    currently_running_loan_type: {
      type: String,
    },
    currently_running_loan_sanction_amount: {
      type: String,
    },
    currently_running_loan_emi: {
      type: String,
    },
    course_type: {
      type: String,
    },
    last_study: {
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
    education: [
      {
        examination: String,
        passingYear: String,
        percentage: String,
        school_name: String,
      },
    ],
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
    isCustomer: {
      type: Boolean,
    },
    loantype: {
      type: String,
    },
    city: {
      type: String,
    },
    leadstatus: {
      type: String,
    },
    reference: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    state: {
      type: String,
    },
    service_staff: {
      type: String,
    },
    loan_amount: {
      type: String,
    },
    password: {
      type: String,
    },
    converted_date: {
      type: Date,
      default: new Date(),
    },
    shisava: {
      type: Boolean,
    },
    shri_shava_remark: {
      type: String,
    },
    shri_sava_amount: {
      type: String,
    },
  },
  {
    collection: "student",
  }
);

module.exports = mongoose.model("Student", Student);
