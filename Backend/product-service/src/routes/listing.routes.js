const express = require("express");
const router = express.Router();

// TEMP test route
router.get("/test", (req, res) => {
  res.json({ message: "Product service route working" });
});

module.exports = router;
