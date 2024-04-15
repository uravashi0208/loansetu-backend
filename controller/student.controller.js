const Student = require("../model/student");
const messages = require("../constant/message");
const Notification = require("../model/notification");
const leadHistory = require("../model/leadHistory");
const user = require("../model/user");

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
      message: `Lead created by ${staff.user_name} to New`,
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
  console.log("req.body :", req.body);
  const _id = req.params.id;
  if (req.body.leadassign === "leadassign") {
    const currentuserstaff = await user.findById(req.body.createdby);
    const olduserstaff = await user.findById(req.body.old_assigne_staff);
    const newuserstaff = await user.findById(req.body.assigne_staff);
    const leadhistory = {
      staff_id: req.body.createdby,
      student_id: _id,
      message: `${currentuserstaff.user_name} Lead Assigned From ${
        olduserstaff ? olduserstaff.user_name : currentuserstaff.user_name
      } To ${newuserstaff.user_name}`,
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
      message: `${currentuserstaff.user_name} Status Updated From ${findleadstatus.leadstatus} To ${req.body.leadstatus}`,
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
      message: `Lead Updated By ${currentuserstaff.user_name}`,
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
    education: req.body.education,
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
  console.log("pipeline :", pipeline);
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
