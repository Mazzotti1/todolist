const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);

module.exports = router;