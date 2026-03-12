const express = require("express");
const router = express.Router();

const {
  toggleWishlist,
  getWishlist,
} = require("../controllers/wishlist.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// Add or remove from wishlist (toggle)
router.post("/toggle", toggleWishlist);

// Get wishlist
router.get("/:userId", getWishlist);

module.exports = router;