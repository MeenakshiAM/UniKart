// src/routes/product.routes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { createProduct } = require("../controllers/product.controller");
const { getMyProducts } = require("../controllers/product.controller");
router.post(
  "/",
  authMiddleware,
  roleMiddleware("SELLER"),
  createProduct
);
router.get(
  "/my-products",
  authMiddleware,
  roleMiddleware("SELLER"),
  getMyProducts
);

module.exports = router;
