const LeadFollowUp = require("../model/leadFollowUp");
const messages = require("../constant/message");
const leadHistory = require("../model/leadHistory");
const user = require("../model/user");
const Student = require("../model/student");
const Notification = require("../model/notification");
const moment = require("moment");

exports.getAllLeadFollowUp = (req, res, next) => {
  const id = req.params.id;

  const pipeline = [
    {
      $match: {
        student_id: id,
      },
    },

    {
      $addFields: {
        createdBy: {
          $cond: {
            if: { $ne: ["$createdby", ""] },
            then: { $toObjectId: "$createdby" },
            else: null, // Handle empty 'university' field
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
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
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];

  LeadFollowUp.aggregate(pipeline)
    .then((foundLeadFollowUp) => {
      if (foundLeadFollowUp && foundLeadFollowUp.length > 0) {
        res.json({
          response: true,
          data: foundLeadFollowUp,
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

exports.addLeadFollowUp = async (req, res, next) => {
  try {
    const updatedData = {
      createdby: req.body.createdby,
      student_id: req.body.student_id,
      current_followup_date: req.body.current_followup_date,
      current_followup_comment: req.body.current_followup_comment,
      next_followup_date: req.body.next_followup_date,
      next_followup_comment: req.body.next_followup_comment,
      followup_place: req.body.followup_place,
    };

    await LeadFollowUp.create(updatedData);
    const staff = await user.findById(req.body.createdby);
    const leadhistory = {
      staff_id: req.body.createdby,
      student_id: req.body.student_id,
      message: `${staff.user_name} Add Next Followup Date At ${moment(
        req.body.next_followup_date
      ).format("YYYY-MM-DD hh:mm")}`,
    };
    await leadHistory.create(leadhistory);
    const updatedStudentData = {
      leadstatus: "Processing",
    };

    await Student.updateOne(
      { _id: req.body.student_id }, // Query to find the record to update
      { $set: updatedStudentData } // The update operation to apply
    );

    const currentuserstudent = await Student.findById(req.body.student_id);
    const leadnotification = {
      staff_id: req.body.createdby,
      createdBy: req.body.createdby,
      message: `${currentuserstudent.student_name} - Next Follow UP ${moment(
        req.body.next_followup_date
      ).format("YYYY-MM-DD hh:mm")}`,
      isRead: false,
    };
    await Notification.create(leadnotification);
    res.json({
      response: true,
      message: messages.ADD_LEAD_STATUS,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAllLeadFollowUpNotifiction = (req, res, next) => {
  const id = req.params.id;

  const pipeline = [
    {
      $match: {
        createdby: id,
      },
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
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
    {
      $lookup: {
        from: "student", // Correct collection name if it's different
        localField: "studentId",
        foreignField: "_id",
        as: "studentDetails",
      },
    },
    {
      $unwind: {
        path: "$studentDetails",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
      },
    },
  ];

  LeadFollowUp.aggregate(pipeline)
    .then((foundLeadFollowUp) => {
      if (foundLeadFollowUp && foundLeadFollowUp.length > 0) {
        res.json({
          response: true,
          data: foundLeadFollowUp,
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