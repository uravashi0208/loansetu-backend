const LeadActivityLog = require("../model/leadActivityLog");
const messages = require("../constant/message");

exports.getAllLeadActivityLog = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: {
        student_id: id,
      },
    },
    {
      $sort: {
        createdAt: -1, // Sorting in descending order
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
  ];

  LeadActivityLog.aggregate(pipeline)
    .then((foundLeadActivityLog) => {
      if (foundLeadActivityLog && foundLeadActivityLog.length > 0) {
        res.json({
          response: true,
          data: foundLeadActivityLog,
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

exports.addLeadActivityLog = async (req, res, next) => {
  try {
    // Check if email or phone number already exists

    const createdData = {
      student_id: req.body.student_id,
      staff_id: req.body.staff_id,
      activity_log_details: req.body.activity_log_details,
    };

    await LeadActivityLog.create(createdData);
    res.json({
      response: true,
      message: messages.ADD_ACTIVITY_LOG,
    });
  } catch (error) {
    return next(error);
  }
};
