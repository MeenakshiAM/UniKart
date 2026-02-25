const Cart = require("../models/cart.model");

exports.addToCart = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const userId = req.user.userId;
    const { productId, quantity, priceAtTime } = req.body;
    if (!userId || !productId || !quantity || !priceAtTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });

    // 🟢 If cart does not exist → create new cart
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, priceAtTime }],
      });

      await cart.save();
      return res.status(201).json(cart);
    }

    // 🔍 Check if product already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // 🟡 Product exists → increase quantity
      cart.items[itemIndex].quantity += quantity;

      // Optional: update priceAtTime if needed
      cart.items[itemIndex].priceAtTime = priceAtTime;
    } else {
      // 🔵 Product does not exist → push new item
      cart.items.push({ productId, quantity, priceAtTime });
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    //const { productId, quantity, priceAtTime } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};