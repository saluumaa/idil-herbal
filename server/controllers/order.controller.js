const mongoose = require('mongoose');
const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod } = req.body;

    // Validate payload
    if (!products || !Array.isArray(products) || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      paymentMethod, 
      
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
    console.log('Order placed successfully:', order);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error creating order:', err.message);
  }
};


const getUserOrders = async (req, res) => {
  try {
    // Check if the user is an admin
    const isAdmin = req.user.role === 'admin';

    let orders;
    if (isAdmin) {
      // If admin, fetch all orders and populate user and product details
      orders = await Order.find({})
        .populate('user', 'name email') // Populate username and email of the user
        .populate('products.product', 'name price'); // Populate name of the product
    } else {
      // If not admin, fetch only the orders of the logged-in user
      const userId = req.user.id;
      orders = await Order.find({ user: userId }).populate('products.product');
    }

    res.json(orders);
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ error: err.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId, deliveryStatus } = req.body;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.deliveryStatus = deliveryStatus;
    await order.save();

    return res.status(200).json({ message: 'Delivery status updated', order });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOrder, getUserOrders, updateOrderStatus, deleteOrder, updateDeliveryStatus };
