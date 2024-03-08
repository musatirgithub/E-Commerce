const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getAllProducts, getProducts, createProduct, deleteProduct, updateProduct, getProduct, uploadProductImage} = require('../controllers/productController');

// router.get('/all-products', authenticateUser, authorizePermissions('admin'), getAllProducts);
router.get('/', getProducts);
router.get('/all-products', getAllProducts);
router.post('/', authenticateUser, authorizePermissions('admin'), createProduct);
router.post('/upload-image', authenticateUser, authorizePermissions('admin'), uploadProductImage);
router.delete('/:id', authenticateUser, authorizePermissions('admin'), deleteProduct);
router.patch('/:id', authenticateUser, authorizePermissions('admin'), updateProduct);
router.get('/:id', getProduct);

module.exports = router;