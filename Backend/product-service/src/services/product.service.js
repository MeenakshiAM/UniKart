const axios = require("axios");
const Product = require("../models/Product");

exports.createProductService = async (productData, sellerId) => {
  
  const { 
    title,
     description, 
     category, 
     subCategory, 
     basePrice, 
     quantity, 
     images 
    } = productData;

  // 🔹 Call moderation service
  const moderationResponse = await axios.post(
    "http://localhost:4003/api/moderation/analyze",
    { text: `${title} ${description}` }
  );

  const { isAllowed, reason } = moderationResponse.data;

let status;
let isApproved;

if (isAllowed) {
  status = "ACTIVE";
  isApproved = true;
} else {
  status = "REJECTED";
  isApproved = false;
}


  // 🔹 Calculate final price
  const commissionPercent = 10;
  const finalPrice = basePrice + (basePrice * commissionPercent) / 100;

const product = await Product.create({
  title,
  description,
  category,
  subCategory,
  price: {
    basePrice,
    commissionPercent,
    finalPrice
  },
  quantity,
  images,
  sellerId,
  status,
  isApproved,
  moderationReason: isAllowed ? null : reason
});

  return {
    blocked: false,
    product
  };
};
