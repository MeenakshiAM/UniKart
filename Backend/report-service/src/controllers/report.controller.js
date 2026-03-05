const reportService = require("../services/report.service");

exports.createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);

    res.status(201).json({
      message: "Report submitted",
      report
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create report",
      error: error.message
    });
  }
};