const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number },
  stock: { type: Number, required: true },
  stockStatus: { type: String, required: true },
  category: { type: String, required: true },
  // rating: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      username:{type: String, required: true},
      text: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
  images: { type: Array},
  size: [
    {
      name: { type: String, required: true, default: 'Small' },
      available: { type: Boolean, default: true },
      price: { type: Number, required: true },
      weight: { type: Number, required: true },
      
    },
  ],
  deals: { type: Boolean, default: false },
  newProduct: { type: Boolean, default: false },
  topProduct: { type: Boolean, default: false },
  lovedProduct: { type: Boolean, default: false },
  ReturnandRefundPolicy: { type: String},
  ShippingInfo: { type: String},
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
