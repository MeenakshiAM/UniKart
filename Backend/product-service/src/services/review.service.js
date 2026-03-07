const axios = require("axios");
const Review = require("../models/Review");
const Product = require("../models/Product");

exports.createReview = async ({ productId, userId, rating, text }) => {

  // prevent spam (20 sec rule)
  const lastReview = await Review.findOne({
    userId,
    productId
  }).sort({ createdAt: -1 });

  if (lastReview) {
    const diff = Date.now() - new Date(lastReview.createdAt);

    if (diff < 20000) {
      throw new Error("You are reviewing too fast. Please wait 20 seconds.");
    }
  }

  // moderation check
  const moderation = await axios.post(
    "http://localhost:4003/api/moderation/analyze",
    { text }
  );

  const { isAllowed, reason } = moderation.data;

  if (!isAllowed) {
    throw new Error(`Review rejected: ${reason}`);
  }

  // create review
  const review = await Review.create({
    productId,
    userId,
    rating,
    text
  });

  // update product rating
  await updateProductRating(productId, rating);

  return review;
};



async function updateProductRating(productId, newRating) {

  const product = await Product.findById(productId);

  const totalRating =
    product.ratings.average * product.ratings.count;

  const newCount = product.ratings.count + 1;

  const newAverage =
    (totalRating + newRating) / newCount;

  product.ratings.average = newAverage;
  product.ratings.count = newCount;

  await product.save();
}