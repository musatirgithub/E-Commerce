const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getAllUsers, getSingleUser, updateUser, updateUserPassword, showMe} = require('../controllers/userController');

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showMe', authenticateUser, showMe);
router.patch('/update-user', authenticateUser, updateUser);
router.patch('/update-user-password', authenticateUser, updateUserPassword);
router.get('/:id', authenticateUser, getSingleUser);

module.exports = router;