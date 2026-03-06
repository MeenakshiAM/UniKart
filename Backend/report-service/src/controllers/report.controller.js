const reportService = require("../services/report.service");

exports.createReport = async (req, res) => {
  try {
    const reporterId = req.user.userId;
    const { targetId, targetType, reason, description } = req.body;

    const result = await reportService.createReport({
      reporterId,
      targetId,
      targetType,
      reason,
      description
    });

    return res.status(201).json(result);

  } catch (error) {
    console.error("Create Report Error:", error);

    if (error.message === "DUPLICATE_REPORT") {
      return res.status(400).json({
        message: "You already reported this item"
      });
    }

    return res.status(500).json({ message: "Server Error" });
  }
};