const express = require("express");
const router = express.Router();

const {
  registerUser,
  registerSeller,
  getAllUsers,
  login,
  testAuth,
  uploadProfileImage,
  verifyEmail,
  approveSeller
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const upload = require("../middlewares/upload.middleware");


// PUBLIC
router.post("/register", registerUser);
router.post("/login", login);


// ADMIN ONLY
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllUsers
);

router.patch(
  "/approve-seller/:sellerId",
  authMiddleware,
  roleMiddleware("ADMIN"),
  approveSeller
);
// AUTH TEST
router.get(
  "/test",
  authMiddleware,
  testAuth
);


// BUYER → SELLER
router.post(
  "/register-seller",
  authMiddleware,
  roleMiddleware("BUYER"),
  registerSeller
);


// PROFILE IMAGE
router.patch(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage
);

router.get("/verify-email", verifyEmail);

module.exports = router;