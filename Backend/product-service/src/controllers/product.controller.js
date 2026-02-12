const { createProductService } = require("../services/product.service");
const axios = require("axios"); 
const Product = require("../models/Product");

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
exports.getMyProducts = async (req, res) => {
   try { 
    const sellerId = req.user.userId; 
    const products = await Product.find({ sellerId }); 
    res.status(200).json({ success: true, count: products.length, products });
   }
    catch (error) 
    { 
      console.log("GET MY PRODUCTS ERROR:", error); 
      res.status(500).json({ success: false, message: "Server error" });
     }
     };
