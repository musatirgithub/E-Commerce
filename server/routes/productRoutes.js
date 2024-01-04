const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getProducts, createProduct, deleteProduct, updateProduct, getProduct} = require('../controllers/taskController');

// router.get('/all-products', authenticateUser, authorizePermissions('admin'), getAllProducts);
router.get('/', authenticateUser, getProducts);
router.post('/', authenticateUser, createProduct);
router.delete('/:id', authenticateUser, deleteProduct);
router.patch('/:id', authenticateUser, updateProduct);
router.get('/:id', authenticateUser, getProduct);

module.exports = router;