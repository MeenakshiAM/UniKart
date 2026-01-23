const userRepo = require("../repository/user.repository");
const sellerRepo = require("../repository/sellerProfile.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  return await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    registerNumber,
    dateOfBirth,
    department,
    role: "BUYER"
  });
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

  // Prevent re-registration
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

  // CASE 1: Create seller profile
  if (!existingProfile) {
    const profile = await sellerRepo.createSellerProfile({
      userId,
      shopName,
      shopDescription,
      agreedToCommission,
      status,
    });

    // ROLE TRANSITION
    if (status === "ACTIVE") {
      await userRepo.updateUserById(userId, {
        role: "SELLER",
        isSeller: true
      });
       User = await userRepo.getUserById(userId);
    }

    return {
      message:
        status === "ACTIVE"
          ? "Seller activated successfully"
          : "Seller registered, pending verification",
      profile,
        user: {
    id: User._id,
    role: User.role,
    isSeller: User.isSeller
  }
    };
  }

  // CASE 2: Update pending seller
  if (existingProfile.status === "PENDING") {
    const updatedProfile = await sellerRepo.updateSellerByUserId(userId, {
      shopName,
      shopDescription,
      agreedToCommission,
      status,
      role
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
  if (!user) throw new Error("Invalid email or password");

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
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
