const express = require("express");
const router = express.Router();

const {
  registerUser,
  registerSeller,
  getAllUsers,
  login,
  testAuth
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

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

// ANY AUTHENTICATED USER
router.get(
  "/test",
  authMiddleware,
  testAuth
);

// ONLY BUYER → SELLER
router.post(
  "/register-seller",
  authMiddleware,
  roleMiddleware("BUYER"),
  registerSeller
);

module.exports = router;
