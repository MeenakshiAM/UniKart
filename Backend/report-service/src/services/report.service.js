const Report = require("../models/report.model");

exports.createReport = async (data) => {

  const report = new Report(data);

  await report.save();

  return report;
};