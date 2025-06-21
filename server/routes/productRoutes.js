const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Transaction = require("../models/Transactions");

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a new product
router.post("/", auth, async (req, res) => {
  const { name, unit } = req.body;
  try {
    const newProduct = new Product({
      name,
      unit,
      user: req.user.id, // ✅ Save owner
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Add product failed" });
  }
});

// Update stock (buy or sell)
router.put("/:id/stock", auth, async (req, res) => {
  const { quantity, type, pricePerItem, date } = req.body;

  if (!["buy", "sell"].includes(type)) {
    return res.status(400).json({ msg: "Invalid type" });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ msg: "Quantity must be positive" });
  }

  if (!pricePerItem || pricePerItem <= 0) {
    return res.status(400).json({ msg: "Price must be positive" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const transactionDate = date ? new Date(date) : new Date();

    // ⛔ Prevent overselling
    if (type === "sell") {
      if (product.stock < quantity) {
        return res.status(400).json({ msg: "Insufficient stock to sell" });
      }

      // 🔍 Check if sell date is before first buy
      const firstBuy = await Transaction.findOne({
        product: req.params.id,
        user: req.user.id,
        type: "buy",
      }).sort({ date: 1 });

      if (!firstBuy) {
        return res
          .status(400)
          .json({ msg: "No previous purchase found for this product." });
      }

      if (transactionDate < new Date(firstBuy.date)) {
        return res.status(400).json({
          msg: `Sell date cannot be earlier than first buy date: ${firstBuy.date.toDateString()}`,
        });
      }
    }

    // ✅ Update stock
    product.stock += type === "buy" ? quantity : -quantity;
    await product.save();

    // ✅ Log transaction
    const transaction = new Transaction({
      product: req.params.id,
      user: req.user.id,
      quantity,
      type,
      pricePerItem,
      date: transactionDate,
    });
    await transaction.save();

    res.json({ msg: `Stock ${type}ed successfully`, product, transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
