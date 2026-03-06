const { 
  createProductService,
  updateProductService
} = require("../services/product.service");

const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const sellerId = req.user.userId;

    const result = await createProductService(req.body, sellerId);

    res.status(201).json({
      message: "Product processed successfully",
      product: result.product
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// Seller dashboard
exports.getMyProducts = async (req, res) => {
  try {
    const sellerId = req.user.userId;

    const products = await Product.find({ sellerId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.log("GET MY PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Marketplace - Active only
exports.getAllActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "ACTIVE"
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.log("GET ACTIVE PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Public seller profile
exports.getProductsBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await Product.find({
      sellerId,
      status: "ACTIVE"
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.log("GET SELLER PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const { id } = req.params;

    const updatedProduct = await updateProductService(
      id,
      sellerId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const { id } = req.params;

    const product = await Product.findOneAndDelete({
      _id: id,
      sellerId
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
exports.hideProduct = async (req, res) => {

  const sellerId = req.user.userId;
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(
    { _id: id, sellerId },
    { status: "HIDDEN" },
    { new: true }
  );

  res.json({
    message: "Product hidden",
    product
  });

};