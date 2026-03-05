const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report.controller");

router.post("/", reportController.createReport);

module.exports = router;