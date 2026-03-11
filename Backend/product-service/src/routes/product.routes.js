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
  resubmitProduct ,
  reduceStock,
  restoreStock 
} = require("../controllers/product.controller");

// Public - Marketplace Feed (with search/filter support)
// ── Public ───────────────────────────────────────────────────
router.get("/", getAllActiveProducts);
router.get("/seller/:sellerId", getProductsBySellerId); // ← before /:id

// ── Seller dashboard routes ──────────────────────────────────
router.get("/my", authMiddleware, roleMiddleware("SELLER"), getMyProducts);
router.get("/my/drafts", authMiddleware, roleMiddleware("SELLER"), getMyDrafts);
router.get("/my/drafts/:id", authMiddleware, roleMiddleware("SELLER"), getDraftById);
router.get("/my/rejected", authMiddleware, roleMiddleware("SELLER"), getMyRejectedProducts);
router.get("/my/hidden", authMiddleware, roleMiddleware("SELLER"), getMyHiddenProducts);

// ── Public single product ────────────────────────────────────
router.get("/:id", getProductById);                     // ← after all specific GET routes

// ── Seller actions ───────────────────────────────────────────
router.post("/", authMiddleware, roleMiddleware("SELLER"), createProduct);
router.patch("/:id", authMiddleware, roleMiddleware("SELLER"), updateProduct);
router.patch("/:id/hide", authMiddleware, roleMiddleware("SELLER"), hideProduct);
router.patch("/:id/unhide", authMiddleware, roleMiddleware("SELLER"), unhideProduct);
router.patch("/:id/resubmit", authMiddleware, roleMiddleware("SELLER"), resubmitProduct);
router.delete("/:id", authMiddleware, roleMiddleware("SELLER"), deleteProduct);

// ── Internal - order service ─────────────────────────────────
router.patch("/:id/reduce-stock", authMiddleware, reduceStock);
router.patch("/:id/restore-stock", authMiddleware, restoreStock);

module.exports = router;