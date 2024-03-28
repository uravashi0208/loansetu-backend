const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Notification = new Schema(
  {
    message: {
      type: String,
    },
    staff_id: {
      type: String,
    },
    isRead: {
      type: Boolean,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    upadatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "notification",
  }
);

module.exports = mongoose.model("Notification", Notification);
