const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middlewares/authentication');
const {getAllTasks, getTasks, createTask, deleteTasks, updateTask, getTask} = require('../controllers/taskController');

router.get('/all-tasks', authenticateUser, authorizePermissions('admin'), getAllTasks);
router.get('/', authenticateUser, getTasks);
router.post('/', authenticateUser, createTask);
router.delete('/:id', authenticateUser, deleteTasks);
router.patch('/:id', authenticateUser, updateTask);
router.get('/:id', authenticateUser, getTask);

module.exports = router;