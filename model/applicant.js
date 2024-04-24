const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ApplicantDetails = new Schema(
  {
    co_applicant1_name: {
      type: String,
    },
    co_applicant1_relation_with_student: {
      type: String,
    },
    co_applicant1_dob: {
      type: String,
    },
    co_applicant1_aadhar_no: {
      type: String,
    },
    co_applicant1_pan_no: {
      type: String,
    },
    co_applicant1_passport: {
      type: String,
    },
    co_applicant1_marital_status: {
      type: String,
    },
    co_applicant1_phone: {
      type: Number,
    },
    co_applicant1_height: {
      type: String,
    },
    co_applicant1_weight: {
      type: String,
    },
    co_applicant1_email: {
      type: String,
    },
    co_applicant1_father_full_name: {
      type: String,
    },
    co_applicant1_mother_full_name: {
      type: String,
    },
    co_applicant1_resident_address: {
      type: String,
    },
    co_applicant1_pincode: {
      type: String,
    },
    co_applicant1_permanent_address: {
      type: String,
    },
    co_applicant1_permanent_pincode: {
      type: String,
    },
    co_applicant1_year_in_current_address: {
      type: String,
    },
    co_applicant1_reference_name: {
      type: String,
    },
    co_applicant1_reference_phone_no: {
      type: Number,
    },
    co_applicant1_reference_address: {
      type: String,
    },
    co_applicant1_loan_amount_required: {
      type: String,
    },
    co_applicant1_type_of_employment: {
      type: String,
    },
    co_applicant1_company_name: {
      type: String,
    },
    co_applicant1_applicant_designation: {
      type: String,
    },
    co_applicant1_work_experience: {
      type: String,
    },
    co_applicant1_current_work_experience: {
      type: String,
    },
    co_applicant1_bussiness_address: {
      type: String,
    },
    co_applicant1_bussiness_pincode: {
      type: String,
    },
    co_applicant1_net_monthly_income: {
      type: String,
    },
    co_applicant1_other_income: {
      type: String,
    },
    co_applicant1_gold: {
      type: String,
    },
    co_applicant1_land: {
      type: String,
    },
    co_applicant1_life_insurance_policy: {
      type: String,
    },
    co_applicant1_property: {
      type: String,
    },
    co_applicant1_shares: {
      type: String,
    },
    co_applicant1_rent_income: {
      type: String,
    },
    co_applicant1_bank_balance: {
      type: String,
    },
    co_applicant1_bank_name: {
      type: String,
    },
    co_applicant1_account_number: {
      type: String,
    },
    co_applicant1_ifsc_code: {
      type: String,
    },
    co_applicant1_currently_running_loan_bank: {
      type: String,
    },
    co_applicant1_currently_running_loan_type: {
      type: String,
    },
    co_applicant1_currently_running_loan_sanction_amount: {
      type: String,
    },
    co_applicant1_currently_running_loan_emi: {
      type: String,
    },

    co_applicant2_name: {
      type: String,
    },
    co_applicant2_relation_with_student: {
      type: String,
    },
    co_applicant2_dob: {
      type: String,
    },
    co_applicant2_aadhar_no: {
      type: String,
    },
    co_applicant2_pan_no: {
      type: String,
    },
    co_applicant2_passport: {
      type: String,
    },
    co_applicant2_marital_status: {
      type: String,
    },
    co_applicant2_phone: {
      type: Number,
    },
    co_applicant2_height: {
      type: String,
    },
    co_applicant2_weight: {
      type: String,
    },
    co_applicant2_email: {
      type: String,
    },
    co_applicant2_father_full_name: {
      type: String,
    },
    co_applicant2_mother_full_name: {
      type: String,
    },
    co_applicant2_resident_address: {
      type: String,
    },
    co_applicant2_pincode: {
      type: String,
    },
    co_applicant2_permanent_address: {
      type: String,
    },
    co_applicant2_permanent_pincode: {
      type: String,
    },
    co_applicant2_year_in_current_address: {
      type: String,
    },
    co_applicant2_reference_name: {
      type: String,
    },
    co_applicant2_reference_phone_no: {
      type: Number,
    },
    co_applicant2_reference_address: {
      type: String,
    },
    co_applicant2_loan_amount_required: {
      type: String,
    },
    co_applicant2_type_of_employment: {
      type: String,
    },
    co_applicant2_company_name: {
      type: String,
    },
    co_applicant2_applicant_designation: {
      type: String,
    },
    co_applicant2_work_experience: {
      type: String,
    },
    co_applicant2_current_work_experience: {
      type: String,
    },
    co_applicant2_bussiness_address: {
      type: String,
    },
    co_applicant2_bussiness_pincode: {
      type: String,
    },
    co_applicant2_net_monthly_income: {
      type: String,
    },
    co_applicant2_other_income: {
      type: String,
    },
    co_applicant2_gold: {
      type: String,
    },
    co_applicant2_land: {
      type: String,
    },
    co_applicant2_life_insurance_policy: {
      type: String,
    },
    co_applicant2_property: {
      type: String,
    },
    co_applicant2_shares: {
      type: String,
    },
    co_applicant2_rent_income: {
      type: String,
    },
    co_applicant2_bank_balance: {
      type: String,
    },
    co_applicant2_bank_name: {
      type: String,
    },
    co_applicant2_account_number: {
      type: String,
    },
    co_applicant2_ifsc_code: {
      type: String,
    },
    co_applicant2_currently_running_loan_bank: {
      type: String,
    },
    co_applicant2_currently_running_loan_type: {
      type: String,
    },
    co_applicant2_currently_running_loan_sanction_amount: {
      type: String,
    },
    co_applicant2_currently_running_loan_emi: {
      type: String,
    },
    student_id: {
      type: String,
    },
  },
  {
    collection: "applicantdetails",
  }
);

module.exports = mongoose.model("ApplicantDetails", ApplicantDetails);
