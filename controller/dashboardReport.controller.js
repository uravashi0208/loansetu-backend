const Student = require("../model/student");
const messages = require("../constant/message");

exports.getAllLeadReport = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, isCustomer: false },
    },
    {
      $group: {
        _id: null,
        totalLeads: { $sum: 1 },
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }

  Student.aggregate(pipeline)
    .then((result) => {
      if (result && result.length > 0) {
        const { totalLeads } = result[0];
        res.json({
          response: true,
          totalLeads: totalLeads,
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

exports.getAllNewLeadReport = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, isCustomer: false, leadstatus: "New" },
    },
    {
      $group: {
        _id: null,
        totalLeads: { $sum: 1 },
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }

  Student.aggregate(pipeline)
    .then((result) => {
      if (result && result.length > 0) {
        const { totalLeads } = result[0];
        res.json({
          response: true,
          totalLeads: totalLeads,
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

exports.getAllProcessingLeadReport = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, isCustomer: false, leadstatus: "Processing" },
    },
    {
      $group: {
        _id: null,
        totalLeads: { $sum: 1 },
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }

  Student.aggregate(pipeline)
    .then((result) => {
      if (result && result.length > 0) {
        const { totalLeads } = result[0];
        res.json({
          response: true,
          totalLeads: totalLeads,
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

exports.getAllCancelLeadReport = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, isCustomer: false, leadstatus: "Cancel" },
    },
    {
      $group: {
        _id: null,
        totalLeads: { $sum: 1 },
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }

  Student.aggregate(pipeline)
    .then((result) => {
      if (result && result.length > 0) {
        const { totalLeads } = result[0];
        res.json({
          response: true,
          totalLeads: totalLeads,
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

exports.getAllLeadChartReport = (req, res, next) => {
  const id = req.params.id;
  const pipeline = [
    {
      $match: { isLead: true, isCustomer: false },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, leadstatus: "$leadstatus" }, // Group by month and lead status
        totalLeads: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.month": 1 }, // Sort by month
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { assigne_staff: id } });
  }

  Student.aggregate(pipeline)
    .then((result) => {
      if (result && result.length > 0) {
        const leadData = {};

        result.forEach((item) => {
          const month = item._id.month - 1; // Adjust month index to start from 0
          const status = item._id.leadstatus || "Unknown"; // If lead status is null, set it to "Unknown"
          const totalLeads = item.totalLeads;

          if (!leadData[status]) {
            leadData[status] = Array(12).fill(0);
          }

          leadData[status][month] = totalLeads;
        });

        const formattedData = Object.keys(leadData).map((status) => ({
          leadstatus: status,
          data: leadData[status],
        }));

        res.json({
          response: true,
          data: formattedData,
        });
      } else {
        res.json({
          response: false,
          message: "No data found.",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        response: false,
        message: "An error occurred while fetching data.",
      });
    });
};

exports.getAllReferenceLead = (req, res, next) => {
  const pipeline = [
    {
      $match: { isLead: true, isCustomer: false },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, leadstatus: "$leadstatus" }, // Group by month and lead status
        totalLeads: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.month": 1 }, // Sort by month
    },
  ];

  Student.aggregate(pipeline)
    .then((result) => {
      if (result && result.length > 0) {
        const leadData = {};

        result.forEach((item) => {
          const month = item._id.month - 1; // Adjust month index to start from 0
          const status = item._id.leadstatus || "Unknown"; // If lead status is null, set it to "Unknown"
          const totalLeads = item.totalLeads;

          if (!leadData[status]) {
            leadData[status] = Array(12).fill(0);
          }

          leadData[status][month] = totalLeads;
        });

        const formattedData = Object.keys(leadData).map((status) => ({
          leadstatus: status,
          data: leadData[status],
        }));

        res.json({
          response: true,
          data: formattedData,
        });
      } else {
        res.json({
          response: false,
          message: "No data found.",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        response: false,
        message: "An error occurred while fetching data.",
      });
    });
};

exports.getReferenceLeadCount = (req, res, next) => {
  Student.aggregate([
    {
      $match: { createdBy: { $exists: true } },
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
        from: "user", // Name of the User collection
        localField: "createdBy",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: {
        path: "$users",
        preserveNullAndEmptyArrays: true, // Preserve records even if universityDetails is empty
      },
    },
    {
      $match: { "users.role": "partner" },
    },
    {
      $group: {
        _id: "$users.company_name", // Group by company name
        leadCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id field
        company_name: "$_id", // Rename _id to company_name
        leadCount: 1, // Include leadCount field
      },
    },
  ])
    .then((result) => {
      if (result && result.length > 0) {
        res.json({
          response: true,
          leadCounts: result,
        });
      } else {
        res.json({
          response: false,
          message: "No leads found for partners.",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        response: false,
        message: "An error occurred while fetching data.",
      });
    });
};
