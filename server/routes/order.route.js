const express = require('express');
const { createOrder, getUserOrders, updateOrderStatus, deleteOrder, updateDeliveryStatus, getMonthlySales } = require('../controllers/order.controller.js');
const validateToken = require('../utils/validateToken');
const adminVerification = require('../utils/adminVerification');

const router = express.Router();

router.post('/', validateToken, createOrder);
router.get('/', validateToken, getUserOrders);
router.get('/monthly-sales', validateToken, adminVerification, getMonthlySales);
router.put('/status', validateToken, adminVerification, updateOrderStatus);
router.put('/delivery-status', validateToken, adminVerification, updateDeliveryStatus);
router.delete('/:id', validateToken, adminVerification, deleteOrder);

module.exports = router;
