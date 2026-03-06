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
        // Product
        "SPAM",
        "FAKE_PRODUCT",
        "SCAM",
        "COPYRIGHT",

        // User
        "FAKE_USER",
        "SCAMMER",
        "SPAM_ACCOUNT",

        // Shared
        "HARASSMENT",
        "ABUSE",

        // Review
        "FAKE_REVIEW"
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
    },

    isAutoChecked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


// Prevent duplicate reporting
reportSchema.index({ reporterId: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model("Report", reportSchema);