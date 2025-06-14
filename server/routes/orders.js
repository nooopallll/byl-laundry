// server/routes/orders.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware'); // <-- Impor middleware admin
const { 
  getAllOrders, 
  updateOrderStatus, 
  getOrderByCode,
  getMyOrders,
  createOrder,
} = require('../controllers/orderController');

// Rute Terproteksi untuk pelanggan yang login
router.route('/myorders').get(protect, getMyOrders);

// Rute Admin yang sekarang sudah diproteksi
router.route('/').get(admin, getAllOrders);
router.route('/').post(admin, createOrder); 
router.route('/:id/status').put(admin, updateOrderStatus); 

// Rute Publik
router.route('/:orderCode').get(getOrderByCode);

module.exports = router;