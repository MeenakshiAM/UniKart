const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  text: {
    type: String,
    maxlength: 1000
  },

  // ⭐ NEW FIELD
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 3;
      },
      message: "Maximum 3 images allowed"
    },
    default: []
  },

  status: {
    type: String,
    enum: ["ACTIVE", "REJECTED"],
    default: "ACTIVE"
  },

  moderationReason: {
    type: String,
    default: null
  }

},
{ timestamps: true }
);

// prevent multiple reviews by same user for same product
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);