const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Create (admin-like)
router.post('/', auth, async (req, res) => {
  // in a real app check role; here any authenticated user can add
  const { title, description, price, category, image, stock } = req.body;
  try {
    const p = new Product({ title, description, price, category, image, stock });
    await p.save();
    res.json(p);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Read list with filters: ?minPrice=&maxPrice=&category=
router.get('/', async (req, res) => {
  const { minPrice, maxPrice, category, q, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (q) filter.title = new RegExp(q, 'i');
  try {
    const products = await Product.find(filter)
      .skip((page-1)*limit).limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ products, total });
  } catch(err){ res.status(500).json({ message: 'Server error' }); }
});

// Read one
router.get('/:id', async (req, res) => {
  try{ const p = await Product.findById(req.params.id); res.json(p); }catch(e){ res.status(404).json({}); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try { await Product.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch(e){ res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
