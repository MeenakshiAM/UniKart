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

  //  Moderation
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


  // MODERATION IF TEXT UPDATED
 
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

 
  //PRICE UPDATE

  if (updateData.price?.basePrice) {

    const commissionPercent = 10; // keep fixed from system
    const basePrice = updateData.price.basePrice;

    const finalPrice =
      basePrice + (basePrice * commissionPercent) / 100;

    product.price.basePrice = basePrice;
    product.price.commissionPercent = commissionPercent;
    product.price.finalPrice = finalPrice;
  }


  if (updateData.quantity !== undefined) {
    product.quantity = updateData.quantity;
  }

  if (updateData.images) {
    product.images = updateData.images;
  }

  if (updateData.category) {
    product.category = updateData.category;
  }

  if (updateData.subCategory) {
    product.subCategory = updateData.subCategory;
  }

  if (updateData.type) {
    product.type = updateData.type;
  }

  await product.save();

  return product;
};
