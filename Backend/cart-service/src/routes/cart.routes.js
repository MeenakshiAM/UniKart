const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// Add item to cart
router.post("/add",authMiddleware, addToCart);

// Get user cart
router.get("/:userId", authMiddleware, getCart);

// Remove item from cart
router.delete("/remove", authMiddleware, removeFromCart);

// Clear entire cart
router.delete("/clear/:userId", authMiddleware, clearCart);

module.exports = router;