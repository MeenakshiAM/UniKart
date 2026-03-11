const Review = require("../models/Review");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// ─── helper ─────────────────────────────────────────────────
const validateObjectId = (id, label = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ${label}`);
  }
};

// ─── Create Review ───────────────────────────────────────────
// ─── Create Review ───────────────────────────────────────────
exports.createReview = async ({ productId, userId, rating, text, images }) => {

  validateObjectId(productId, "product ID");

  // check product exists
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // prevent reviewing inactive products
  if (product.status !== "ACTIVE") {
    throw new Error("Cannot review this product");
  }

  // prevent seller from reviewing their own product
  if (product.sellerId.toString() === userId) {
    throw new Error("You cannot review your own product");
  }

  // check duplicate review
  const existingReview = await Review.findOne({ productId, userId });
  if (existingReview) throw new Error("You have already reviewed this product");

  // rating validation
  if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");

  // image validation
  if (images && images.length > 3) throw new Error("Maximum 3 images allowed");

  const review = await Review.create({
    productId,
    userId,
    rating,
    text,
    images
  });

  // sync product rating
  await exports.updateProductRating(productId);

  return review;
};
// ─── Update Review ───────────────────────────────────────────
exports.updateReviewService = async ({ reviewId, userId, rating, text, images }) => {

  validateObjectId(reviewId, "review ID");

  const review = await Review.findById(reviewId);

  if (!review) throw new Error("Review not found");

  if (review.userId.toString() !== userId) {
    throw new Error("Not allowed to update this review");
  }

  if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");


  if (images && images.length > 3) throw new Error("Maximum 3 images allowed");

  if (rating != null) review.rating = rating;
  if (text != null) review.text = text;
  if (images != null) review.images = images;

  await review.save();

  // sync product rating since rating may have changed
  await exports.updateProductRating(review.productId);

  return review;
};

// ─── Delete Review ───────────────────────────────────────────
exports.deleteReviewService = async ({ reviewId, userId }) => {

  validateObjectId(reviewId, "review ID");

  const review = await Review.findById(reviewId);

  if (!review) throw new Error("Review not found");

  if (review.userId.toString() !== userId) {
    throw new Error("Not allowed to delete this review");
  }

  const productId = review.productId;

  await review.deleteOne();

  // sync product rating after deletion
  await exports.updateProductRating(productId);

  return { message: "Review deleted" };
};

// ─── Get Reviews by Product (with pagination) ────────────────
exports.getReviewsByProductService = async (productId, query) => {

  validateObjectId(productId, "product ID");

  const { page = 1, limit = 10 } = query;

  const filter = { productId, status: "ACTIVE" };

  const total = await Review.countDocuments(filter);

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return {
    reviews,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit))
  };
};

// ─── Update Product Rating (internal helper) ─────────────────
exports.updateProductRating = async (productId) => {

  const stats = await Review.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
        status: "ACTIVE"
      }
    },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: parseFloat(stats[0].avgRating.toFixed(2)),
      reviewCount: stats[0].reviewCount
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      reviewCount: 0
    });
  }
};

// ─── Get Rating Breakdown ────────────────────────────────────
exports.getRatingBreakdown = async (productId) => {

  validateObjectId(productId, "product ID");

  const stats = await Review.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
        status: "ACTIVE"
      }
    },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 }
      }
    }
  ]);

  let breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalReviews = 0;
  let totalRating = 0;

  stats.forEach(item => {
    breakdown[item._id] = item.count;
    totalReviews += item.count;
    totalRating += item._id * item.count;
  });

  const averageRating =
    totalReviews === 0 ? 0 : (totalRating / totalReviews).toFixed(2);

  return { averageRating, totalReviews, ratingBreakdown: breakdown };
};