const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createProduct,
  getMyProducts,
  getAllActiveProducts,
  getProductsBySellerId,
  getProductById,
  updateProduct,
  deleteProduct,
  hideProduct,
  unhideProduct,       // ← new
  getMyDrafts,         // ← new
  getDraftById,        // ← new
  getMyRejectedProducts, // ← new
  getMyHiddenProducts, // ← new
  resubmitProduct      // ← new
} = require("../controllers/product.controller");

// Public - Marketplace Feed (with search/filter support)
router.get("/", getAllActiveProducts);

// Public - Single product
router.get("/:id", getProductById);

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

// Seller - Hide product
router.patch(
  "/:id/hide",
  authMiddleware,
  roleMiddleware("SELLER"),
  hideProduct
);

// Seller - Delete product
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SELLER"),
  deleteProduct
);

router.get("/my/drafts", authMiddleware, roleMiddleware("SELLER"), getMyDrafts);
router.get("/my/rejected", authMiddleware, roleMiddleware("SELLER"), getMyRejectedProducts);
router.get("/my/hidden", authMiddleware, roleMiddleware("SELLER"), getMyHiddenProducts);

// Seller - Draft by ID
router.get("/my/drafts/:id", authMiddleware, roleMiddleware("SELLER"), getDraftById);

// Seller - Unhide
router.patch("/:id/unhide", authMiddleware, roleMiddleware("SELLER"), unhideProduct);

// Seller - Resubmit rejected
router.patch("/:id/resubmit", authMiddleware, roleMiddleware("SELLER"), resubmitProduct);
module.exports = router;