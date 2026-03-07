const reviewService = require("../services/review.service");
const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { id } = req.params;

    const { rating, text } = req.body;

    const review = await reviewService.createReview({
      productId: id,
      userId,
      rating,
      text
    });

    res.status(201).json({
      success: true,
      review
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


exports.getReviewsByProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const reviews = await Review.find({
      productId: id,
      status: "ACTIVE"
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};