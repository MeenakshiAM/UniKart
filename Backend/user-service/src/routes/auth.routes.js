const express = require("express");
const router = express.Router();

const {
  registerUser,
  registerSeller,
  getAllUsers,
  login,
  testAuth,
  uploadProfileImage,
  verifyEmail
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