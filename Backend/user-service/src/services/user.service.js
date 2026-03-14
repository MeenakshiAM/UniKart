const userRepo = require("../repository/user.repository");
const sellerRepo = require("../repository/sellerProfile.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/sendEmail");


// -------- Validation Functions --------
function isValidRegisterNumber(registerNumber) {
  const pattern = /^LBT(2[0-6])(IT|CS|EC|ER|CV)\d{3}$/;
  return pattern.test(registerNumber);
}

function isValidAge(dob) {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 25;
}

const allowedDepartments = ["IT", "CS", "EC", "ER", "CV"];

// ------------------ USER REGISTRATION ------------------
exports.registerUser = async ({
  name,
  email,
  password,
  registerNumber,
  dateOfBirth,
  department
}) => {

  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  if (!isValidRegisterNumber(registerNumber))
    throw new Error("Invalid registration number");

  if (!isValidAge(dateOfBirth))
    throw new Error("Age must be between 18 and 25");

  if (!allowedDepartments.includes(department))
    throw new Error("Invalid department");

  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔐 generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    registerNumber,
    dateOfBirth,
    department,
    role: "BUYER",
    emailVerified: false,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: Date.now() + 3600000
  });

  // 📧 send verification email
  await sendVerificationEmail(email, verificationToken);

  return {
    message: "User registered successfully. Please verify your email.",
    user
  };
};


// ------------------ SELLER REGISTRATION ------------------
exports.registerSeller = async ({
  userId,
  shopName,
  shopDescription,
  agreedToCommission
}) => {

  const user = await userRepo.getUserById(userId);

  if (!user) throw new Error("User not found");

  if (user.role === "SELLER" || user.role === "ADMIN") {
    throw new Error("User already has seller/admin privileges");
  }

  const existingProfile = await sellerRepo.getSellerByUserId(userId);

  const isVerified =
    isValidRegisterNumber(user.registerNumber) &&
    isValidAge(user.dateOfBirth) &&
    allowedDepartments.includes(user.department) &&
    agreedToCommission === true;

  const status = isVerified ? "ACTIVE" : "PENDING";

  if (!existingProfile) {

    const profile = await sellerRepo.createSellerProfile({
      userId,
      shopName,
      shopDescription,
      agreedToCommission,
      status
    });

    let updatedUser = user;

    if (status === "ACTIVE") {

      await userRepo.updateUserById(userId, {
        role: "SELLER",
        isSeller: true
      });

      updatedUser = await userRepo.getUserById(userId);
    }

    return {
      message:
        status === "ACTIVE"
          ? "Seller activated successfully"
          : "Seller registered, pending verification",

      profile,

      user: {
        id: updatedUser._id,
        role: updatedUser.role,
        isSeller: updatedUser.isSeller
      }
    };
  }

  if (existingProfile && existingProfile.status === "PENDING") {

    const updatedProfile = await sellerRepo.updateSellerByUserId(userId, {
      shopName,
      shopDescription,
      agreedToCommission,
      status
    });

    if (status === "ACTIVE") {

      await userRepo.updateUserById(userId, {
        role: "SELLER",
        isSeller: true
      });

    }

    return {
      message:
        status === "ACTIVE"
          ? "Seller activated successfully"
          : "Seller details updated, still pending",

      profile: updatedProfile
    };
  }

  throw new Error("Seller already active");

};

// ------------------ GET USERS (ADMIN ONLY) ------------------
exports.getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

// ------------------ LOGIN ------------------
exports.loginUser = async ({ email, password }) => {

  const user = await userRepo.findUserByEmail(email);

  if (!user.emailVerified) {
  throw new Error("Please verify your email before logging in");
}


  if (user.isBanned) {
    throw new Error("Account permanently banned");
  }

  if (user.isSuspended) {

    if (!user.suspensionEnd) {
      throw new Error("Account suspended");
    }

    if (user.suspensionEnd > new Date()) {
      throw new Error("Account temporarily suspended");
    }

  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      isSeller: user.isSeller
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    }
  };
};

// ------------------ UPDATE PROFILE IMAGE ------------------
exports.updateProfileImage = async (userId, imageUrl) => {

  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await userRepo.updateUserById(userId, {
    profileImage: imageUrl
  });

  return updatedUser;

};

exports.verifyEmail = async (token) => {

  const user = await userRepo.findUserByVerificationToken(token);

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  if (user.emailVerificationExpires < new Date()) {
    throw new Error("Verification token expired");
  }

  await userRepo.updateUserById(user._id, {
    emailVerified: true,
    emailVerificationToken: null,
    emailVerificationExpires: null
  });

  return true;
};
