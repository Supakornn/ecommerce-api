const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not exceed 100 characters"]
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Name can not exceed 1000 characters"]
    },
    image: {
      type: String,
      default: "/uploads/example.jpg"
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Please provide product category"],
      enum: ["1", "2", "3"]
    },
    inventory: {
      type: Number,
      required: true,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", ProductSchema);
