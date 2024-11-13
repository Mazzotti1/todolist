const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/byUser', taskController.getTasksByUser);

module.exports = router;