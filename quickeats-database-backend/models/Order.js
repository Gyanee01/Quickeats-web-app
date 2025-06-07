const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number
  }],
  totalAmount: Number,
  status: { type: String, enum: ['pending', 'preparing', 'on_the_way', 'delivered'], default: 'pending' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  deliveryDriverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estimatedTime: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
