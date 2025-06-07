const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: String,
  cuisine: String,
  imageUrl: String,
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
