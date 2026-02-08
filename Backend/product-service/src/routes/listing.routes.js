const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
console.log(authMiddleware);
const { createProduct } = require("../controllers/product.controller");

router.post(
  "/",
  authMiddleware,          
  roleMiddleware("SELLER"),
  createProduct
);

module.exports = router;
