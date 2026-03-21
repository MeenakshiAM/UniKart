const express = require("express");
const router = express.Router();

const {
  analyzeText,
  getLogs,
} = require("../controllers/moderation.controller");

router.post("/analyze", analyzeText);
router.get("/logs", getLogs);

module.exports = router;
