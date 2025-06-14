const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getAllOrders, 
  updateOrderStatus, 
  getOrderByCode,
  getMyOrders
} = require('../controllers/orderController');

// Rute Terproteksi untuk pelanggan yang login
router.route('/myorders').get(protect, getMyOrders);

// Rute Admin (diasumsikan sudah diproteksi di level aplikasi utama)
router.route('/').get(getAllOrders);
router.route('/:id/status').put(updateOrderStatus);

// Rute Publik
router.route('/:orderCode').get(getOrderByCode);

module.exports = router;