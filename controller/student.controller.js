const Student = require("../model/student");
const messages = require("../constant/message");
const Notification = require("../model/notification");

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

exports.getAllLead = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true },
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
    };

    if (req.body.assigne_staff) {
      const assignleads = {
        staff_id: req.body.assigne_staff,
        createdBy: req.body.createdBy,
        message: "Asssign a lead.",
        isRead: false,
      };
      await Notification.create(assignleads);
    }
    await Student.create(updatedData);
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

exports.updateStudent = (req, res) => {
  const _id = req.params.id;
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
