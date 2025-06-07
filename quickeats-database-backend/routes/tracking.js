const express = require('express');
const router = express.Router();
const { trackOrder } = require('../controllers/trackingController');

router.get('/:orderId', trackOrder);

module.exports = router;
