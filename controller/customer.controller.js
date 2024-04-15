const Student = require("../model/student");
const messages = require("../constant/message");

exports.getAllCustomer = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: false, isCustomer: true },
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

  if (id.includes("service")) {
    pipeline.unshift({ $match: { service_staff: id.split("-")[1] } });
  } else if (id !== "admin") {
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
