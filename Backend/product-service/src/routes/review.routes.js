const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/products/:id/reviews",
  authMiddleware,
  reviewController.createReview
);

router.get(
  "/products/:id/reviews",
  reviewController.getReviewsByProduct
);

module.exports = router;