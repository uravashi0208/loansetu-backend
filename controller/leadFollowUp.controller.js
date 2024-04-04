const LeadFollowUp = require("../model/leadFollowUp");
const messages = require("../constant/message");
const leadHistory = require("../model/leadHistory");
const user = require("../model/user");

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
      comment: req.body.comment,
      next_followup_date: req.body.next_followup_date,
    };

    await LeadFollowUp.create(updatedData);
    const staff = await user.findById(req.body.createdby);
    const leadhistory = {
      staff_id: req.body.createdby,
      student_id: req.body.student_id,
      message: `${staff.user_name} Add Next Followup Date At ${req.body.next_followup_date}`,
    };
    await leadHistory.create(leadhistory);
    res.json({
      response: true,
      message: messages.ADD_LEAD_STATUS,
    });
  } catch (error) {
    return next(error);
  }
};
