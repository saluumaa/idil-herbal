const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Admin stats endpoint
router.get('/stats', async (req, res) => {
  try {
    const [totalOrders, totalRevenue, totalProducts, totalUsers] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        {
          $match: {
            paymentStatus: 'paid'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" }
          }
        }
      ]),
      Product.countDocuments(),
      User.countDocuments()
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      totalProducts,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router