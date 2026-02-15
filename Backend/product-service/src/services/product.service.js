const axios = require("axios");
const Product = require("../models/Product");

exports.createProductService = async (productData, sellerId) => {

  const {
    title,
    description,
    type,
    category,
    subCategory,
    basePrice,
    quantity,
    images
  } = productData;

  // 🔹 Moderation
  const moderationResponse = await axios.post(
    "http://localhost:4003/api/moderation/analyze",
    { text: `${title} ${description}` }
  );

  const { isAllowed, reason } = moderationResponse.data;

  const status = isAllowed ? "ACTIVE" : "REJECTED";

  const commissionPercent = 10;
  const finalPrice =
    basePrice + (basePrice * commissionPercent) / 100;

  const product = await Product.create({
    title,
    description,
    type, 
    category,
    subCategory,
    price: {
      basePrice,
      commissionPercent,
      finalPrice
    },
    quantity: type === "PRODUCT" ? quantity : undefined,
    images,
    sellerId,
    status,
    moderationReason: isAllowed ? null : reason
  });

  return { product };
};

exports.updateProductService = async (
  productId,
  sellerId,
  updateData
) => {

  const product = await Product.findOne({
    _id: productId,
    sellerId
  });

  if (!product) {
    throw new Error("Product not found or unauthorized");
  }

  // 🔹 If title or description is being updated → Moderate
  if (updateData.title || updateData.description) {

    const textToModerate = `
      ${updateData.title || product.title}
      ${updateData.description || product.description}
    `;

    const moderationResponse = await axios.post(
      "http://localhost:4003/api/moderation/analyze",
      { text: textToModerate }
    );

    const { isAllowed, reason } = moderationResponse.data;

    if (!isAllowed) {
      product.status = "REJECTED";
      product.moderationReason = reason;
      await product.save();
      throw new Error("Content rejected by moderation");
    }

    product.status = "ACTIVE";
    product.moderationReason = null;
  }

  // 🔹 Update allowed fields
  Object.keys(updateData).forEach(key => {
    product[key] = updateData[key];
  });

  await product.save();

  return product;
};
