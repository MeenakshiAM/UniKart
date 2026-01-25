const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    category: {
      type: String,
      required: true,
      index: true, // for filtering
    },

    subCategory: {
      type: String,
    },

    price: {
      basePrice: {
        type: Number,
        required: true,
        min: 0,
      },
      commissionPercent: {
        type: Number,
        default: 10, // admin can change later
      },
      finalPrice: {
        type: Number,
        required: true,
      },
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
      validate: [(arr) => arr.length > 0, "At least one image required"],
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    moderationReason: {
      type: String,
    },

    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
