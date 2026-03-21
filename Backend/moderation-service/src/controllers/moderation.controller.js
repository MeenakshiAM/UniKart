const {
  analyzeAndDecide
} = require("../services/moderation/moderationEngine");
const ModerationLog = require("../models/moderationLog");


exports.analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Text is required for moderation",
      });
    }

    const result = await analyzeAndDecide(text);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Moderation error:", error.message);
    return res.status(500).json({
      error: "Moderation service failed",
    });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 100);
    const logs = await ModerationLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json({ logs });
  } catch (error) {
    console.error("Get moderation logs error:", error.message);
    return res.status(500).json({ error: "Failed to fetch moderation logs" });
  }
};
