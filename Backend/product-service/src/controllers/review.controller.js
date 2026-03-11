const Review = require("../models/Review");
const Product = require("../models/Product");
const reviewService = require("../services/review.service");
const mongoose = require("mongoose");

exports.createReview = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { id } = req.params;

    const { rating, text, images } = req.body;

    const review = await reviewService.createReview({
      productId: id,
      userId,
      rating,
      text: text || "",
      images: images || []
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
    
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }


    const reviews = await Review.find({
      productId: id,
      status: "ACTIVE"
    })
    //.populate("userId", "name")
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews
    });

  } catch (error) {
  console.error(error); // ← add this to every catch
  res.status(500).json({ success: false, message: error.message });
}

};

exports.deleteReview = async (req, res) => {

  try {

    const userId = req.user.userId;
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Not allowed to delete this review"
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Review deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

exports.getRatingStats = async (req, res) => {

  try {

    const { id } = req.params;

    const stats = await reviewService.getRatingBreakdown(id);

    res.json({
      success: true,
      stats
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

exports.updateReview = async (req, res) => {

  try {

    const userId = req.user.userId;
    const { reviewId } = req.params;

    const { rating, text, images } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Not allowed to update this review"
      });
    }

    if (images && images.length > 3) {
      return res.status(400).json({
        message: "Maximum 3 images allowed"
      });
    }

    if (rating) review.rating = rating;
    if (text) review.text = text;
    if (images) review.images = images;

    await review.save();

    res.json({
      success: true,
      review
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};