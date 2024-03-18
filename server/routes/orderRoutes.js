const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getAllOrders, getUserOrders, createOrder, deleteOrder, updateOrder, getOrder, config, createPaymentIntent, checkIfUserOrderedProduct} = require('../controllers/orderController');

router.get('/all-orders', authenticateUser, authorizePermissions('admin'), getAllOrders);
router.get('/config', authenticateUser, config);
router.post('/create-payment-intent', authenticateUser, createPaymentIntent);
router.get('/', authenticateUser, getUserOrders);
router.post('/', authenticateUser, createOrder);
router.get('/check-if-ordered/:id', authenticateUser, checkIfUserOrderedProduct);
router.delete('/:id', authenticateUser, deleteOrder);
router.patch('/:id', authenticateUser, updateOrder);
router.get('/:id', authenticateUser, getOrder);

module.exports = router;