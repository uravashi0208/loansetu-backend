const Notification = require("../model/notification");
const messages = require("../constant/message");

exports.getAllNotification = (req, res, next) => {
  const id = req.params.id;

  const pipeline = [
    {
      $lookup: {
        from: "user", // Correct collection name if it's different
        localField: "createdBy",
        foreignField: "_id",
        as: "studentsDetails",
      },
    },
    {
      $unwind: {
        path: "$studentsDetails",
      },
    },
  ];

  if (id !== "admin") {
    pipeline.unshift({ $match: { staff_id: id } });
  }

  Notification.aggregate(pipeline)
    .then((foundNotification) => {
      if (foundNotification && foundNotification.length > 0) {
        res.json({
          response: true,
          data: foundNotification,
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
