const Report = require("../models/report.model");
const automationService = require("./automation.service");

exports.createReport = async ({
  reporterId,
  targetId,
  targetType,
  reason,
  description
}) => {

  try {

    const report = await Report.create({
      reporterId,
      targetId,
      targetType,
      reason,
      description
    });

    // run automation after saving report
    await automationService.evaluateReports(targetId, targetType);

    return {
      message: "Report submitted successfully",
      report
    };

  } catch (error) {

    if (error.code === 11000) {
      throw new Error("DUPLICATE_REPORT");
    }

    throw error;
  }
};