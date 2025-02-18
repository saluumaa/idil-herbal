
// const stripe = require('stripe')('your_stripe_secret_key');  // Your Stripe secret key
// const processPayment = async (req, res) => {
//   try {
//     const { orderId, paymentMethod } = req.body;

//     // Check if payment method is card
//     if (paymentMethod === 'card') {
//       // Use Stripe to process payment
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: 1000, // amount in cents (e.g., $10.00)
//         currency: 'usd',
//         payment_method: req.body.paymentMethodId,
//         confirm: true,
//       });

//       // Update order with payment status
//       const order = await Order.findById(orderId);
//       order.paymentStatus = 'paid';
//       await order.save();

//       res.status(200).json({ message: 'Payment successful', paymentIntent });
//     } else {
//       // Cash on delivery case: no payment processing
//       const order = await Order.findById(orderId);
//       order.paymentStatus = 'paid'; // assume cash on delivery is "paid"
//       await order.save();

//       res.status(200).json({ message: 'Order placed with Cash on Delivery' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { processPayment };
const mongoose = require('mongoose');
const Order = require("../models/Order.js");

const processPayment = async (req, res) => {
  try {
    const {orderId, paymentMethod, paymentReference } = req.body;

    console.log("Incoming Request Body:", req.body);

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid or missing order ID" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (["zaad", "edahab"].includes(paymentMethod)) {
      if (!paymentReference) {
        return res.status(400).json({ error: "Transaction ID required" });
      }

      order.paymentStatus = "paid";
      order.paymentReference = paymentReference;
      await order.save();

      return res.status(200).json({ message: `Payment successful via ${paymentMethod}`, order });
    } else if (["paypal", "flutterwave"].includes(paymentMethod)) {
      return res.status(200).json({ message: `Payment pending via ${paymentMethod}` });
    } else if (paymentMethod === "cash-on-delivery") {
      order.paymentStatus = "paid";
      await order.save();

      return res.status(200).json({ message: "Order placed with Cash on Delivery", order });
    } else {
      return res.status(400).json({ error: "Invalid payment method" });
    }
  } catch (err) {
    console.error("Error processing payment:", err.message);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
  
module.exports = { processPayment };
  