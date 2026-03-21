const express = require("express");
const router = express.Router();

const moderationController = require("../controllers/moderation.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.patch("/warn/:id", authMiddleware, roleMiddleware("ADMIN"), moderationController.warnUser);

router.patch("/suspend/:id", authMiddleware, roleMiddleware("ADMIN"), moderationController.suspendUser);

router.patch("/ban/:id", authMiddleware, roleMiddleware("ADMIN"), moderationController.banUser);

module.exports = router;