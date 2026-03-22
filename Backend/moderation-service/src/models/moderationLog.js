const mongoose = require("mongoose");

const moderationLogSchema = new mongoose.Schema(
  {
    inputText: {
      type: String,
      required: true,
    },

    toxicityScore: {
      type: Number,
      required: true,
    },

    isAllowed: {
      type: Boolean,
      required: true,
    },

    reasons: {
      type: [String], // e.g. ["INSULT", "PROFANITY"]
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("ModerationLog", moderationLogSchema);
