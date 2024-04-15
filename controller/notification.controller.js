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
    {
      $sort: {
        createdAt: -1, // or -1 for descending order
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

exports.updateNotification = async (req, res) => {
  const _id = req.params.id;
  Notification.updateMany({ staff_id: _id }, { $set: { isRead: true } })
    .then((notification) => {
      if (!notification) {
        res.json({ response: false, message: messages.NO_DATA_FOUND });
      } else {
        res.json({
          response: true,
          data: notification,
          message: messages.UPDATE_NOTIFICATION,
        });
      }
    })
    .catch((error) => {
      res.json({ response: false, errors: error });
    });
};