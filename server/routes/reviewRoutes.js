const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getAllReviews, getUserReviews, createReview, deleteReview, updateReview, getReview, getProductReviews} = require('../controllers/reviewController');

router.get('/all-reviews', authenticateUser, authorizePermissions('admin'), getAllReviews);
router.get('/product-reviews/:id', authenticateUser, getProductReviews);
router.get('/', authenticateUser, getUserReviews);
router.post('/', authenticateUser, createReview);
router.delete('/:id', authenticateUser, deleteReview);
router.patch('/:id', authenticateUser, updateReview);
router.get('/:id', authenticateUser, getReview);

module.exports = router;