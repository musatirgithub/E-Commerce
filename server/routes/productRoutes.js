const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getProducts, createProduct, deleteProduct, updateProduct, getProduct} = require('../controllers/productController');

// router.get('/all-products', authenticateUser, authorizePermissions('admin'), getAllProducts);
router.get('/', getProducts);
router.post('/', authenticateUser, authorizePermissions('admin'), createProduct);
router.delete('/:id', authenticateUser, authorizePermissions('admin'), deleteProduct);
router.patch('/:id', authenticateUser, authorizePermissions('admin'), updateProduct);
router.get('/:id', getProduct);

module.exports = router;