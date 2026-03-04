const cartService = require("../services/cart.service");

exports.addToCart = async (req, res) => {
  try {
    const cart = await cartService.addToCart(
      req.user.userId,
      req.body.productId,
      req.body.quantity,
      req.body.priceAtTime
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(
      req.user.userId,
      req.body.productId
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user.userId);
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};