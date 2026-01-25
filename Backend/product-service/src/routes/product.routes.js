const express = require("express");
const router = express.Router();

const {
  createProduct,
} = require("../controllers/product.controller");

// CREATE PRODUCT
router.post("/", createProduct);

module.exports = router;
