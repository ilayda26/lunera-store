const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ["rings", "necklaces", "bracelets", "earrings", "bags", "other"],
      required: true
    },
    material: {
      type: String,
      enum: ["gold", "silver", "rose gold", "stainless steel", "leather", "other"],
      required: true
    },
    image: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);