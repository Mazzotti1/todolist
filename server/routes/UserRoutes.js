import express from 'express';
import userController from '../controllers/UserController.js'; 

const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/', userController.getUsers);

export default router; 
