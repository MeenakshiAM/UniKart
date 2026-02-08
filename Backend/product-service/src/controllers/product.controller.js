const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    
    console.log("REQ.USER =", req.user.userId);

     const sellerId = req.user.userId;
    
    const {
      title,
      description,
      category,
      subCategory,
      basePrice,
      quantity,
      images,
      
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !basePrice ||
      !quantity ||
      !images ||
      !sellerId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const commissionPercent = 10;
    const finalPrice =
      basePrice + (basePrice * commissionPercent) / 100;

    const product = await Product.create({
      title,
      description,
      category,
      subCategory,
      price: {
        basePrice,
        commissionPercent,
        finalPrice,
      },
      quantity,
      images,
      sellerId,
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Product created and sent for moderation",
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
