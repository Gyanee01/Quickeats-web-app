const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  method: { type: String, enum: ['card', 'upi', 'wallet'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
