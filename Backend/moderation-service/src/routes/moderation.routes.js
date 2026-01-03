const express = require("express");
const router = express.Router();

const { testModeration } = require("../controllers/moderation.controller");

router.post("/test", testModeration);

module.exports = router;
