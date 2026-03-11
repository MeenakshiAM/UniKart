const Review = require("../models/Review");
const Product = require("../models/Product");
const mongoose = require("mongoose"); 

exports.createReview = async ({ productId, userId, rating, text, images }) => {

  // check duplicate review
  const existingReview = await Review.findOne({
    productId,
    userId
  });

  if (existingReview) {
    throw new Error("You have already reviewed this product");
  }

  // rating validation
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // image validation
  if (images && images.length > 3) {
    throw new Error("Maximum 3 images allowed");
  }

 const review = await Review.create({
  productId,
  userId,
  rating,
  text,
  images
});

await exports.updateProductRating(productId);

return review;
};


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
      averageRating: stats[0].avgRating,
      reviewCount: stats[0].reviewCount
    });

  } else {

    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      reviewCount: 0
    });

  }

};

exports.getRatingBreakdown = async (productId) => {

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

  let breakdown = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };

  let totalReviews = 0;
  let totalRating = 0;

  stats.forEach(item => {
    breakdown[item._id] = item.count;
    totalReviews += item.count;
    totalRating += item._id * item.count;
  });

  const averageRating =
    totalReviews === 0 ? 0 : (totalRating / totalReviews).toFixed(2);

  return {
    averageRating,
    totalReviews,
    ratingBreakdown: breakdown
  };

};