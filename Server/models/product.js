const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: {
    type: [String], // Assuming you're storing image URLs/paths
    default: []
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subcategory: {
    type: String,
    required: true,
    trim: true
  },
  keypoints: {
    type: [String],
    default: []
  },
  benefits: {
    type: [String],
    default: []
  },
  howToUse: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
