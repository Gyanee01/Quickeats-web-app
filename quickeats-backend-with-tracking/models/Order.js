const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number
  }],
  status: { type: String, default: 'Pending' },
  estimatedTime: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
