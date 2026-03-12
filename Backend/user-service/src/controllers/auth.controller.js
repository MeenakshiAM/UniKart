const userService = require("../services/user.service");

// ---------- REGISTER USER ----------
exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};


// ---------- REGISTER SELLER ----------
exports.registerSeller = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await userService.registerSeller({
      userId,
      ...req.body
    });

    res.status(201).json({
      message: "Seller profile created",
      seller: result
    });

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};


// ---------- GET ALL USERS ----------
exports.getAllUsers = async (req, res) => {
  try {

    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};


// ---------- LOGIN ----------
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await userService.loginUser({ email, password });

    const user = result.user;

    // check suspension
    if (user.isSuspended) {

      if (!user.suspensionEnd) {
        throw new Error("Account permanently banned");
      }

      if (user.suspensionEnd > new Date()) {
        throw new Error("Account temporarily suspended");
      }
    }

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });

  } catch (error) {

    res.status(401).json({
      message: error.message
    });

  }
};


// ---------- TEST AUTH ----------
exports.testAuth = (req, res) => {

  res.json({
    message: "Auth middleware working",
    user: req.user
  });

};