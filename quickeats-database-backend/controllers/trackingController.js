const Order = require('../models/Order');

exports.trackOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ status: order.status, estimatedTime: order.estimatedTime });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};