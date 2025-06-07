const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  currentLocation: String,
  statusUpdates: [{
    status: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Tracking', trackingSchema);
