const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: String,
      required: true
    },

    targetId: {
      type: String,
      required: true
    },

    targetType: {
      type: String,
      enum: ["PRODUCT", "USER", "REVIEW"],
      required: true
    },

    reason: {
      type: String,
      enum: [
        "SPAM",
        "FAKE_PRODUCT",
        "HARASSMENT",
        "SCAM",
        "COPYRIGHT",
        "ABUSE"
      ],
      required: true
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["PENDING", "AUTO_RESOLVED", "REVIEW_REQUIRED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);