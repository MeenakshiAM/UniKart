// src/routes/product.routes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createProduct,
  getMyProducts,
  getAllActiveProducts,
  getProductsBySellerId,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");


// Public - Marketplace Feed
router.get("/", getAllActiveProducts);

// Public - Seller profile view
router.get("/seller/:sellerId", getProductsBySellerId);

// Seller - Get own products
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("SELLER"),
  getMyProducts
);

// Seller - Create product
router.post(
  "/",
  authMiddleware,
  roleMiddleware("SELLER"),
  createProduct
);

// Seller - Update product
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("SELLER"),
  updateProduct
);

// Seller - Delete product
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SELLER"),
  deleteProduct
);
module.exports = router;
