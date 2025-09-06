const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

// Get current user's cart
router.get('/', auth, async (req, res) => {
  await req.user.populate('cart.product');
  res.json({ cart: req.user.cart });
});

// Add or update an item
router.post('/add', auth, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const prod = await Product.findById(productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });

  const existing = req.user.cart.find(c => c.product.toString() === productId);
  if (existing) {
    existing.quantity = Math.max(1, existing.quantity + Number(quantity));
  } else {
    req.user.cart.push({ product: productId, quantity: Number(quantity) });
  }
  await req.user.save();
  await req.user.populate('cart.product');
  res.json({ cart: req.user.cart });
});

// Remove item
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  req.user.cart = req.user.cart.filter(c => c.product.toString() !== productId);
  await req.user.save();
  await req.user.populate('cart.product');
  res.json({ cart: req.user.cart });
});

// Update quantity
router.post('/update', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const item = req.user.cart.find(c => c.product.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });
  item.quantity = Number(quantity);
  await req.user.save();
  await req.user.populate('cart.product');
  res.json({ cart: req.user.cart });
});

module.exports = router;
