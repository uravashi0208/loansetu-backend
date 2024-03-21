const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionSchema = new Schema(
  {
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    permissions: [
      {
        role: { type: String, required: true },
        add: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
    ],
  },
  {
    collection: "staffpermission",
  }
);

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
