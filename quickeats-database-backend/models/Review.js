const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
