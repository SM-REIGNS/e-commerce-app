const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  stock: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
