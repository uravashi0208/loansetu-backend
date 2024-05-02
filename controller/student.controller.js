const Student = require("../model/student");
const messages = require("../constant/message");
const Notification = require("../model/notification");
const leadHistory = require("../model/leadHistory");
const user = require("../model/user");
const ApplicantDetails = require("../model/applicant");

exports.getAllStudent = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $addFields: {
        universityId: {
          $cond: {
            if: { $ne: ["$university", ""] },
            then: { $toObjectId: "$university" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "university", // Correct collection name if it's different
        localField: "universityId",
        foreignField: "_id",
        as: "universityDetails",
      },
    },
    {
      $unwind: {
        path: "$universityDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }
  Student.aggregate(pipeline)
    .then((foundLead) => {
      if (foundLead && foundLead.length > 0) {
        res.json({
          response: true,
          data: foundLead,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllNewLead = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, leadstatus: "New", iscustomer: { $ne: true } },
    },
    {
      $addFields: {
        universityId: {
          $cond: {
            if: { $ne: ["$university", ""] },
            then: { $toObjectId: "$university" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "university", // Correct collection name if it's different
        localField: "universityId",
        foreignField: "_id",
        as: "universityDetails",
      },
    },
    {
      $unwind: {
        path: "$universityDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        loantypeId: {
          $cond: {
            if: { $ne: ["$loantype", ""] },
            then: { $toObjectId: "$loantype" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "loantype", // Correct collection name if it's different
        localField: "loantypeId",
        foreignField: "_id",
        as: "loantypeDetails",
      },
    },
    {
      $unwind: {
        path: "$loantypeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        createdBy: {
          $cond: {
            if: { $ne: ["$createdBy", ""] },
            then: { $toObjectId: "$createdBy" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "createdBy",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        assigne_staff: {
          $cond: {
            if: { $ne: ["$assigne_staff", ""] },
            then: { $toObjectId: "$assigne_staff" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "assigne_staff",
        foreignField: "_id",
        as: "assigneeDetails",
      },
    },
    {
      $unwind: {
        path: "$assigneeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        reference: {
          $cond: {
            if: { $ne: ["$reference", ""] },
            then: { $toObjectId: "$reference" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "reference", // Correct collection name if it's different
        localField: "reference",
        foreignField: "_id",
        as: "referenceDetails",
      },
    },
    {
      $unwind: {
        path: "$referenceDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }
  Student.aggregate(pipeline)
    .then((foundNewLead) => {
      if (foundNewLead && foundNewLead.length > 0) {
        res.json({
          response: true,
          data: foundNewLead,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllProcessingLead = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: {
        isLead: true,
        leadstatus: "Processing",
        iscustomer: { $ne: true },
      },
    },
    {
      $addFields: {
        universityId: {
          $cond: {
            if: { $ne: ["$university", ""] },
            then: { $toObjectId: "$university" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "university", // Correct collection name if it's different
        localField: "universityId",
        foreignField: "_id",
        as: "universityDetails",
      },
    },
    {
      $unwind: {
        path: "$universityDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        loantypeId: {
          $cond: {
            if: { $ne: ["$loantype", ""] },
            then: { $toObjectId: "$loantype" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "loantype", // Correct collection name if it's different
        localField: "loantypeId",
        foreignField: "_id",
        as: "loantypeDetails",
      },
    },
    {
      $unwind: {
        path: "$loantypeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        createdBy: {
          $cond: {
            if: { $ne: ["$createdBy", ""] },
            then: { $toObjectId: "$createdBy" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "createdBy",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        assigne_staff: {
          $cond: {
            if: { $ne: ["$assigne_staff", ""] },
            then: { $toObjectId: "$assigne_staff" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "assigne_staff",
        foreignField: "_id",
        as: "assigneeDetails",
      },
    },
    {
      $unwind: {
        path: "$assigneeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        references: {
          $cond: {
            if: { $ne: ["$reference", ""] },
            then: { $toObjectId: "$reference" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "reference", // Correct collection name if it's different
        localField: "references",
        foreignField: "_id",
        as: "referenceDetails",
      },
    },
    {
      $unwind: {
        path: "$referenceDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }
  Student.aggregate(pipeline)
    .then((foundLead) => {
      if (foundLead && foundLead.length > 0) {
        res.json({
          response: true,
          data: foundLead,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllCancelLead = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, leadstatus: "Cancel", iscustomer: { $ne: true } },
    },
    {
      $addFields: {
        universityId: {
          $cond: {
            if: { $ne: ["$university", ""] },
            then: { $toObjectId: "$university" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "university", // Correct collection name if it's different
        localField: "universityId",
        foreignField: "_id",
        as: "universityDetails",
      },
    },
    {
      $unwind: {
        path: "$universityDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        loantypeId: {
          $cond: {
            if: { $ne: ["$loantype", ""] },
            then: { $toObjectId: "$loantype" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "loantype", // Correct collection name if it's different
        localField: "loantypeId",
        foreignField: "_id",
        as: "loantypeDetails",
      },
    },
    {
      $unwind: {
        path: "$loantypeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        createdBy: {
          $cond: {
            if: { $ne: ["$createdBy", ""] },
            then: { $toObjectId: "$createdBy" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "createdBy",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        assigne_staff: {
          $cond: {
            if: { $ne: ["$assigne_staff", ""] },
            then: { $toObjectId: "$assigne_staff" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "assigne_staff",
        foreignField: "_id",
        as: "assigneeDetails",
      },
    },
    {
      $unwind: {
        path: "$assigneeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        references: {
          $cond: {
            if: { $ne: ["$reference", ""] },
            then: { $toObjectId: "$reference" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "reference", // Correct collection name if it's different
        localField: "references",
        foreignField: "_id",
        as: "referenceDetails",
      },
    },
    {
      $unwind: {
        path: "$referenceDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }
  Student.aggregate(pipeline)
    .then((foundLead) => {
      if (foundLead && foundLead.length > 0) {
        res.json({
          response: true,
          data: foundLead,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllLeadHistory = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: {
        student_id: id,
      },
    },
    {
      $addFields: {
        staffId: {
          $cond: {
            if: { $ne: ["$staff_id", ""] },
            then: { $toObjectId: "$staff_id" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "staffId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];
  leadHistory
    .aggregate(pipeline)
    .then((foundLeadHistory) => {
      if (foundLeadHistory && foundLeadHistory.length > 0) {
        res.json({
          response: true,
          data: foundLeadHistory,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.addStudent = async (req, res, next) => {
  try {
    // Check if email or phone number already exists
    const existingStudent = await Student.findOne({
      phone: req.body.phone,
    });
    if (existingStudent) {
      return res.json({
        response: false,
        message: messages.RECORD_EXIST,
      });
    }
    const updatedData = {
      isAssignee: req.body.assigne_staff ? true : false,
      isCustomer: false,
      assigne_staff: req.body.assigne_staff,
      student_name: req.body.student_name,
      phone: req.body.phone,
      email: req.body.email,
      country: req.body.country,
      university: req.body.university,
      course_name: req.body.course_name,
      course_type: req.body.course_type,
      last_study: req.body.last_study,
      exam: req.body.exam,
      exam_core: req.body.exam_core,
      job: req.body.job,
      business: req.body.business,
      retired: req.body.retired,
      monthlySalary: req.body.monthlySalary,
      salaryInCash: req.body.salaryInCash,
      salaryInBank: req.body.salaryInBank,
      designation: req.body.aadhar_number,
      bussinessline: req.body.bussinessline,
      gst: req.body.gst,
      ssi: req.body.ssi,
      professional_tax: req.body.professional_tax,
      gumastadhara_licence: req.body.gumastadhara_licence,
      bussinessaccountyes: req.body.bussinessaccountyes,
      bussinessaccountno: req.body.bussinessaccountno,
      loanfacilityyes: req.body.loanfacilityyes,
      loanfacilityno: req.body.loanfacilityno,
      loanamount: req.body.loanamount,
      emi: req.body.emi,
      otherearningmember: req.body.otherearningmember,
      propertyyes: req.body.propertyyes,
      propertyno: req.body.propertyno,
      house: req.body.house,
      flats: req.body.flats,
      shop: req.body.shop,
      plot: req.body.plot,
      other: req.body.other,
      marketvalue: req.body.marketvalue,
      otherpropertyname: req.body.otherpropertyname,
      consultantname: req.body.consultantname,
      refrenceothername: req.body.refrenceothername,
      fbinsta: req.body.fbinsta,
      consultant: req.body.consultant,
      refrenceother: req.body.refrenceother,
      agreeconditions: req.body.agreeconditions,
      education: req.body.education,
      city: req.body.city,
      isLead: req.body.isLead,
      loantype: req.body.loantype,
      remark: req.body.remark,
      createdBy: req.body.createdBy,
      leadstatus: "New",
      reference: req.body.reference,
    };

    if (req.body.assigne_staff) {
      const assignleads = {
        staff_id: req.body.assigne_staff,
        createdBy: req.body.createdBy,
        message: "Asssign a New lead.",
        isRead: false,
      };
      await Notification.create(assignleads);
    }

    const createdstudent = await Student.create(updatedData);
    const staff = await user.findById(req.body.createdBy);
    const leadhistory = {
      staff_id: req.body.createdBy,
      student_id: createdstudent._id,
      message: `Lead created by ${
        staff.user_name || staff.authorised_person_name
      } to New`,
    };
    await leadHistory.create(leadhistory);
    res.json({
      response: true,
      message: messages.ADD_STUDENT,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(_id);
    if (!deletedStudent) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_STUDENT,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await Student.findById(_id);
    if (!student) {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
    res.json({
      response: true,
      data: student,
    });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};

exports.updateStudent = async (req, res) => {
  const _id = req.params.id;
  if (req.body.leadassign === "leadassign") {
    const currentuserstaff = await user.findById(req.body.createdby);
    const olduserstaff = await user.findById(req.body.old_assigne_staff);
    const newuserstaff = await user.findById(req.body.assigne_staff);
    const leadhistory = {
      staff_id: req.body.createdby,
      student_id: _id,
      message: `${
        currentuserstaff.user_name || currentuserstaff.authorised_person_name
      } Lead Assigned From ${
        olduserstaff
          ? olduserstaff.user_name || olduserstaff.authorised_person_name
          : currentuserstaff.user_name ||
            currentuserstaff.authorised_person_name
      } To ${newuserstaff.user_name || newuserstaff.authorised_person_name}`,
    };
    await leadHistory.create(leadhistory);
    const updatedData = {
      assigne_staff: req.body.assigne_staff,
    };

    await Student.updateOne(
      { _id: _id }, // Query to find the record to update
      { $set: updatedData } // The update operation to apply
    );

    const query = {
      staff_id: req.body.assigne_staff,
    };

    const update = {
      $set: {
        message: "Asssign a New lead.",
        isRead: false,
        createdBy: req.body.createdby,
      },
    };

    // Options to enable upsert (insert if not exists)
    const options = {
      upsert: true,
      new: true, // Return the modified document rather than the original
      setDefaultsOnInsert: true, // Set default values if creating a new document
    };

    // Find the document and update/create it
    await Notification.findOneAndUpdate(query, update, options);

    return res.json({
      response: true,
      message: messages.UPDATE_LEAD_STATUS,
    });
  } else if (req.body.leadassign === "leadstatuschange") {
    const currentuserstaff = await user.findById(req.body.createdby);
    const findleadstatus = await Student.findById(_id);
    const leadhistory = {
      staff_id: req.body.createdby,
      student_id: _id,
      message: `${
        currentuserstaff.user_name || currentuserstaff.authorised_person_name
      } Status Updated From ${findleadstatus.leadstatus} To ${
        req.body.leadstatus
      }`,
    };
    await leadHistory.create(leadhistory);
    const updatedData = {
      leadstatus: req.body.leadstatus,
    };

    await Student.updateOne(
      { _id: _id }, // Query to find the record to update
      { $set: updatedData } // The update operation to apply
    );
    return res.json({
      response: true,
      message: messages.UPDATE_LEAD_STATUS,
    });
  } else if (req.body.editlead === "editlead") {
    const currentuserstaff = await user.findById(req.body.createdBy);
    const leadhistory = {
      staff_id: req.body.createdBy,
      student_id: _id,
      message: `Lead Updated By ${
        currentuserstaff.user_name || currentuserstaff.authorised_person_name
      }`,
    };
    await leadHistory.create(leadhistory);
    const updatedData = {
      assigne_staff: req.body.assigne_staff,
      student_name: req.body.student_name,
      phone: req.body.phone,
      email: req.body.email,
      loantype: req.body.loantype,
      city: req.body.city,
      country: req.body.country,
      university: req.body.university,
      course_type: req.body.course_type,
      remark: req.body.remark,
      createdBy: req.body.createdBy,
      reference: req.body.reference,
    };

    await Student.updateOne(
      { _id: _id }, // Query to find the record to update
      { $set: updatedData } // The update operation to apply
    );
    return res.json({
      response: true,
      message: messages.UPDATE_LEAD_STATUS,
    });
  } else if (req.body.leadconvert === "leadcovertcustomer") {
    const updatedData = {
      isCustomer: true,
      isLead: false,
    };

    await Student.updateOne(
      { _id: _id }, // Query to find the record to update
      { $set: updatedData } // The update operation to apply
    );

    const updatedApplicantData = {
      student_id: _id,
    };

    await ApplicantDetails.updateOne(
      { student_id: _id },
      updatedApplicantData,
      { upsert: true, new: true }
    );

    return res.json({
      response: true,
      message: messages.UPDATE_LEAD_STATUS,
    });
  } else if (req.body.convert_to_customer === "converttocustomer") {
    const updatedData = {
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      loantype: req.body.loantype,
      resident_address: req.body.resident_address,
      remark: req.body.remark,
      service_staff: req.body.service_staff,
      loan_amount: req.body.loan_amount,
      password: req.body.password,
      converted_date: new Date(),
      isCustomer: true,
      shisava: req.body.shisava,
      shri_shava_remark: req.body.shri_shava_remark,
      shri_sava_amount: req.body.shri_sava_amount,
    };

    await Student.updateOne(
      { _id: _id }, // Query to find the record to update
      { $set: updatedData } // The update operation to apply
    );

    const update = {
      message: "Asssign a New lead.",
      isRead: false,
      createdBy: req.body.createdby,
      staff_id: req.body.service_staff,
    };

    // Find the document and update/create it
    await Notification.create(update);

    return res.json({
      response: true,
      message: messages.UPDATE_LEAD_STATUS,
    });
  } else if (req.body.edit_customer === "edit_customer") {
    const updatedData = {
      student_name: req.body.student_name,
      relation_with_student: req.body.relation_with_student,
      dob: req.body.dob,
      aadhar_no: req.body.aadhar_no,
      pan_no: req.body.pan_no,
      passport: req.body.passport,
      marital_status: req.body.marital_status,
      phone: req.body.phone,
      height: req.body.height,
      weight: req.body.weight,
      email: req.body.email,
      father_full_name: req.body.father_full_name,
      mother_full_name: req.body.mother_full_name,
      resident_address: req.body.resident_address,
      pincode: req.body.pincode,
      permanent_address: req.body.permanent_address,
      permanent_pincode: req.body.permanent_pincode,
      year_in_current_address: req.body.year_in_current_address,
      reference_name: req.body.reference_name,
      reference_phone_no: req.body.reference_phone_no,
      reference_address: req.body.reference_address,
      loan_amount_required: req.body.loan_amount_required,
      exam: req.body.exam,
      listening: req.body.listening,
      reading: req.body.reading,
      writing: req.body.writing,
      speaking: req.body.speaking,
      country: req.body.country,
      university: req.body.university,
      course_name: req.body.course_name,
      type_of_employment: req.body.type_of_employment,
      company_name: req.body.company_name,
      applicant_designation: req.body.applicant_designation,
      work_experience: req.body.work_experience,
      current_work_experience: req.body.current_work_experience,
      bussiness_address: req.body.bussiness_address,
      bussiness_pincode: req.body.bussiness_pincode,
      net_monthly_income: req.body.net_monthly_income,
      other_income: req.body.other_income,
      gold: req.body.gold,
      land: req.body.land,
      life_insurance_policy: req.body.life_insurance_policy,
      property: req.body.property,
      shares: req.body.shares,
      rent_income: req.body.rent_income,
      bank_balance: req.body.bank_balance,
      bank_name: req.body.bank_name,
      account_number: req.body.account_number,
      ifsc_code: req.body.ifsc_code,
      currently_running_loan_bank: req.body.currently_running_loan_bank,
      currently_running_loan_type: req.body.currently_running_loan_type,
      currently_running_loan_sanction_amount:
        req.body.currently_running_loan_sanction_amount,
      currently_running_loan_emi: req.body.currently_running_loan_emi,
      createdBy: req.body.createdBy,
      education: req.body.examinationDetails,
      isCustomer: true,
    };

    const updateStudentData = await Student.updateOne(
      { _id: _id }, // Query to find the record to update
      { $set: updatedData } // The update operation to apply
    );
    if (updateStudentData) {
      const updatedApplicantData = {
        co_applicant1_name: req.body.co_applicant1_name,
        co_applicant1_relation_with_student:
          req.body.co_applicant1_relation_with_student,
        co_applicant1_dob: req.body.co_applicant1_dob,
        co_applicant1_aadhar_no: req.body.co_applicant1_aadhar_no,
        co_applicant1_pan_no: req.body.co_applicant1_pan_no,
        co_applicant1_passport: req.body.co_applicant1_passport,
        co_applicant1_marital_status: req.body.co_applicant1_marital_status,
        co_applicant1_phone: req.body.co_applicant1_phone,
        co_applicant1_height: req.body.co_applicant1_height,
        co_applicant1_weight: req.body.co_applicant1_weight,
        co_applicant1_email: req.body.co_applicant1_email,
        co_applicant1_father_full_name: req.body.co_applicant1_father_full_name,
        co_applicant1_mother_full_name: req.body.co_applicant1_mother_full_name,
        co_applicant1_resident_address: req.body.co_applicant1_resident_address,
        co_applicant1_pincode: req.body.co_applicant1_pincode,
        co_applicant1_permanent_address:
          req.body.co_applicant1_permanent_address,
        co_applicant1_permanent_pincode:
          req.body.co_applicant1_permanent_pincode,
        co_applicant1_year_in_current_address:
          req.body.co_applicant1_year_in_current_address,
        co_applicant1_reference_name: req.body.co_applicant1_reference_name,
        co_applicant1_reference_phone_no:
          req.body.co_applicant1_reference_phone_no,
        co_applicant1_reference_address:
          req.body.co_applicant1_reference_address,
        co_applicant1_loan_amount_required:
          req.body.co_applicant1_loan_amount_required,
        co_applicant1_type_of_employment:
          req.body.co_applicant1_type_of_employment,
        co_applicant1_company_name: req.body.co_applicant1_company_name,
        co_applicant1_applicant_designation:
          req.body.co_applicant1_applicant_designation,
        co_applicant1_work_experience: req.body.co_applicant1_work_experience,
        co_applicant1_current_work_experience:
          req.body.co_applicant1_current_work_experience,
        co_applicant1_bussiness_address:
          req.body.co_applicant1_bussiness_address,
        co_applicant1_bussiness_pincode:
          req.body.co_applicant1_bussiness_pincode,
        co_applicant1_net_monthly_income:
          req.body.co_applicant1_net_monthly_income,
        co_applicant1_other_income: req.body.co_applicant1_other_income,
        co_applicant1_gold: req.body.co_applicant1_gold,
        co_applicant1_land: req.body.co_applicant1_land,
        co_applicant1_life_insurance_policy:
          req.body.co_applicant1_life_insurance_policy,
        co_applicant1_property: req.body.co_applicant1_property,
        co_applicant1_shares: req.body.co_applicant1_shares,
        co_applicant1_rent_income: req.body.co_applicant1_rent_income,
        co_applicant1_bank_balance: req.body.co_applicant1_bank_balance,
        co_applicant1_bank_name: req.body.co_applicant1_bank_name,
        co_applicant1_account_number: req.body.co_applicant1_account_number,
        co_applicant1_ifsc_code: req.body.co_applicant1_ifsc_code,
        co_applicant1_currently_running_loan_bank:
          req.body.co_applicant1_currently_running_loan_bank,
        co_applicant1_currently_running_loan_type:
          req.body.co_applicant1_currently_running_loan_type,
        co_applicant1_currently_running_loan_sanction_amount:
          req.body.co_applicant1_currently_running_loan_sanction_amount,
        co_applicant1_currently_running_loan_emi:
          req.body.co_applicant1_currently_running_loan_emi,
        co_applicant2_name: req.body.co_applicant2_name,
        co_applicant2_relation_with_student:
          req.body.co_applicant2_relation_with_student,
        co_applicant2_dob: req.body.co_applicant2_dob,
        co_applicant2_aadhar_no: req.body.co_applicant2_aadhar_no,
        co_applicant2_pan_no: req.body.co_applicant2_pan_no,
        co_applicant2_passport: req.body.co_applicant2_passport,
        co_applicant2_marital_status: req.body.co_applicant2_marital_status,
        co_applicant2_phone: req.body.co_applicant2_phone,
        co_applicant2_height: req.body.co_applicant2_height,
        co_applicant2_weight: req.body.co_applicant2_weight,
        co_applicant2_email: req.body.co_applicant2_email,
        co_applicant2_father_full_name: req.body.co_applicant2_father_full_name,
        co_applicant2_mother_full_name: req.body.co_applicant2_mother_full_name,
        co_applicant2_resident_address: req.body.co_applicant2_resident_address,
        co_applicant2_pincode: req.body.co_applicant2_pincode,
        co_applicant2_permanent_address:
          req.body.co_applicant2_permanent_address,
        co_applicant2_permanent_pincode:
          req.body.co_applicant2_permanent_pincode,
        co_applicant2_year_in_current_address:
          req.body.co_applicant2_year_in_current_address,
        co_applicant2_reference_name: req.body.co_applicant2_reference_name,
        co_applicant2_reference_phone_no:
          req.body.co_applicant2_reference_phone_no,
        co_applicant2_reference_address:
          req.body.co_applicant2_reference_address,
        co_applicant2_loan_amount_required:
          req.body.co_applicant2_loan_amount_required,
        co_applicant2_type_of_employment:
          req.body.co_applicant2_type_of_employment,
        co_applicant2_company_name: req.body.co_applicant2_company_name,
        co_applicant2_applicant_designation:
          req.body.co_applicant2_applicant_designation,
        co_applicant2_work_experience: req.body.co_applicant2_work_experience,
        co_applicant2_current_work_experience:
          req.body.co_applicant2_current_work_experience,
        co_applicant2_bussiness_address:
          req.body.co_applicant2_bussiness_address,
        co_applicant2_bussiness_pincode:
          req.body.co_applicant2_bussiness_pincode,
        co_applicant2_net_monthly_income:
          req.body.co_applicant2_net_monthly_income,
        co_applicant2_other_income: req.body.co_applicant2_other_income,
        co_applicant2_gold: req.body.co_applicant2_gold,
        co_applicant2_land: req.body.co_applicant2_land,
        co_applicant2_life_insurance_policy:
          req.body.co_applicant2_life_insurance_policy,
        co_applicant2_property: req.body.co_applicant2_property,
        co_applicant2_shares: req.body.co_applicant2_shares,
        co_applicant2_rent_income: req.body.co_applicant2_rent_income,
        co_applicant2_bank_balance: req.body.co_applicant2_bank_balance,
        co_applicant2_bank_name: req.body.co_applicant2_bank_name,
        co_applicant2_account_number: req.body.co_applicant2_account_number,
        co_applicant2_ifsc_code: req.body.co_applicant2_ifsc_code,
        co_applicant2_currently_running_loan_bank:
          req.body.co_applicant2_currently_running_loan_bank,
        co_applicant2_currently_running_loan_type:
          req.body.co_applicant2_currently_running_loan_type,
        co_applicant2_currently_running_loan_sanction_amount:
          req.body.co_applicant2_currently_running_loan_sanction_amount,
        co_applicant2_currently_running_loan_emi:
          req.body.co_applicant2_currently_running_loan_emi,
        student_id: _id,
      };
      await ApplicantDetails.updateOne(
        { student_id: _id },
        updatedApplicantData,
        { upsert: true, new: true }
      );
      return res.json({
        response: true,
        message: messages.UPDATE_STUDENT,
      });
    } else {
      return res.json({ response: false, message: messages.NO_DATA_FOUND });
    }
  }
  Student.findByIdAndUpdate(_id, {
    isAssignee: req.body.assigne_staff ? true : false,
    isCustomer: false,
    assigne_staff: req.body.assigne_staff,
    student_name: req.body.student_name,
    phone: req.body.phone,
    email: req.body.email,
    country: req.body.country,
    university: req.body.university,
    course_name: req.body.course_name,
    course_type: req.body.course_type,
    last_study: req.body.last_study,
    exam: req.body.exam,
    exam_core: req.body.exam_core,
    job: req.body.job,
    business: req.body.business,
    retired: req.body.retired,
    monthlySalary: req.body.monthlySalary,
    salaryInCash: req.body.salaryInCash,
    salaryInBank: req.body.salaryInBank,
    designation: req.body.aadhar_number,
    bussinessline: req.body.bussinessline,
    gst: req.body.gst,
    ssi: req.body.ssi,
    professional_tax: req.body.professional_tax,
    gumastadhara_licence: req.body.gumastadhara_licence,
    bussinessaccountyes: req.body.bussinessaccountyes,
    bussinessaccountno: req.body.bussinessaccountno,
    loanfacilityyes: req.body.loanfacilityyes,
    loanfacilityno: req.body.loanfacilityno,
    loanamount: req.body.loanamount,
    emi: req.body.emi,
    otherearningmember: req.body.otherearningmember,
    propertyyes: req.body.propertyyes,
    propertyno: req.body.propertyno,
    house: req.body.house,
    flats: req.body.flats,
    shop: req.body.shop,
    plot: req.body.plot,
    other: req.body.other,
    marketvalue: req.body.marketvalue,
    otherpropertyname: req.body.otherpropertyname,
    consultantname: req.body.consultantname,
    refrenceothername: req.body.refrenceothername,
    fbinsta: req.body.fbinsta,
    consultant: req.body.consultant,
    refrenceother: req.body.refrenceother,
    agreeconditions: req.body.agreeconditions,
    education: req.body.examinationDetails,
    city: req.body.city,
    isLead: req.body.isLead,
    loantype: req.body.loantype,
    remark: req.body.remark,
    createdBy: req.body.createdBy,
  })
    .then((student) => {
      if (!student) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: student,
          message: messages.UPDATE_STUDENT,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};

exports.getLeadById = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { _id: id },
    },
    {
      $addFields: {
        universityId: {
          $cond: {
            if: { $ne: ["$university", ""] },
            then: { $toObjectId: "$university" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "university", // Correct collection name if it's different
        localField: "universityId",
        foreignField: "_id",
        as: "universityDetails",
      },
    },
    {
      $unwind: {
        path: "$universityDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        loantypeId: {
          $cond: {
            if: { $ne: ["$loantype", ""] },
            then: { $toObjectId: "$loantype" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "loantype", // Correct collection name if it's different
        localField: "loantypeId",
        foreignField: "_id",
        as: "loantypeDetails",
      },
    },
    {
      $unwind: {
        path: "$loantypeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        createdBy: {
          $cond: {
            if: { $ne: ["$createdBy", ""] },
            then: { $toObjectId: "$createdBy" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "createdBy",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $addFields: {
        assigne_staff: {
          $cond: {
            if: { $ne: ["$assigne_staff", ""] },
            then: { $toObjectId: "$assigne_staff" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "assigne_staff",
        foreignField: "_id",
        as: "assigneeDetails",
      },
    },
    {
      $unwind: {
        path: "$assigneeDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
  ];
  Student.aggregate(pipeline)
    .then((foundLead) => {
      if (foundLead && foundLead.length > 0) {
        res.json({
          response: true,
          data: foundLead,
        });
      } else {
        res.json({
          response: false,
          message: messages.NO_DATA_FOUND,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getCustomerById = async (req, res) => {
  try {
    const _id = req.params.id;

    const pipeline = [
      {
        $match: { student_id: _id },
      },
      {
        $addFields: {
          studentId: {
            $cond: {
              if: { $ne: ["$student_id", ""] },
              then: { $toObjectId: "$student_id" },
              else: null, // Handle empty 'university' field
            },
          },
        },
      },
      {
        $lookup: {
          from: "student", // Correct collection name if it's different
          localField: "studentId",
          foreignField: "_id",
          as: "applicantDetails",
        },
      },
      {
        $unwind: {
          path: "$applicantDetails",
          preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
        },
      },
    ];
    ApplicantDetails.aggregate(pipeline)
      .then((foundCustomer) => {
        if (foundCustomer && foundCustomer.length > 0) {
          res.json({
            response: true,
            data: foundCustomer,
          });
        } else {
          res.json({
            response: false,
            message: messages.NO_DATA_FOUND,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    res.json({ response: false, errors: error });
  }
};