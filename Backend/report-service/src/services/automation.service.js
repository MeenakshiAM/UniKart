const axios = require("axios");
const Report = require("../models/report.model");

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

const HIDE_THRESHOLD = 20;
const WARN_THRESHOLD = 40;
const SECOND_WARN_THRESHOLD = 60;
const SUSPEND_THRESHOLD = 100;
const SECOND_SUSPEND_THRESHOLD = 150;
const BAN_THRESHOLD = 200;

exports.evaluateReports = async (targetId, targetType) => {

  // count unique reporters (ANTI-SPAM protection)
  const uniqueReporters = await Report.distinct("reporterId", {
    targetId,
    targetType,
    status: "PENDING"
  });

  const reportCount = uniqueReporters.length;

  console.log("Current report count:", reportCount);

  if (reportCount < HIDE_THRESHOLD) {
    return;
  }

  try {

    // PRODUCT ACTIONS
    if (targetType === "PRODUCT") {

      if (reportCount >= HIDE_THRESHOLD) {

        await axios.patch(`${PRODUCT_SERVICE_URL}/products/hide/${targetId}`);
        console.log("Product hidden due to reports");

      }

    }

    // REVIEW ACTIONS
    if (targetType === "REVIEW") {

      if (reportCount >= HIDE_THRESHOLD) {

        await axios.patch(`${PRODUCT_SERVICE_URL}/reviews/hide/${targetId}`);
        console.log("Review hidden");

      }

      if (reportCount >= WARN_THRESHOLD) {

        await axios.patch(`${USER_SERVICE_URL}/users/warn/${targetId}`);
        console.log("User warned for abusive review");

      }

    }

    // USER ACTIONS
    if (targetType === "USER") {

      if (reportCount >= WARN_THRESHOLD && reportCount < SUSPEND_THRESHOLD) {

        await axios.patch(`${USER_SERVICE_URL}/users/warn/${targetId}`);
        console.log("User warned");

      }

      if (reportCount >= SUSPEND_THRESHOLD && reportCount < BAN_THRESHOLD) {

        await axios.patch(`${USER_SERVICE_URL}/users/suspend/${targetId}`, {
          suspensionDays: 3
        });

        console.log("User temporarily suspended");

      }

      if (reportCount >= BAN_THRESHOLD) {

        await axios.patch(`${USER_SERVICE_URL}/users/ban/${targetId}`);
        console.log("User permanently banned");

      }

    }

  } catch (error) {

    console.error("Automation action failed:", error.message);

  }

  // mark reports as resolved
  await Report.updateMany(
    { targetId, targetType, status: "PENDING" },
    { status: "AUTO_RESOLVED", isAutoChecked: true }
  );

};