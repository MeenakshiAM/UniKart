const { createProductService } = require("../services/product.service");

exports.createProduct = async (req, res) => {
  try {
    const sellerId = req.user.userId;

    const result = await createProductService(req.body, sellerId);

    if (result.blocked) {
      return res.status(400).json({
        message: "Product blocked by moderation",
        reason: result.reason
      });
    }

    res.status(201).json({
      message: "Product created successfully",
      product: result.product
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({
      message: "Server error"
    });
  }
};
