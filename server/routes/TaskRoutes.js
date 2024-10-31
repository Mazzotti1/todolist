const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/byUser', taskController.getTasksByUser);

module.exports = router;