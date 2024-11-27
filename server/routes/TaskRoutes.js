import express from 'express';
import taskController from '../controllers/TaskController.js'; 
const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/byUser', taskController.getTasksByUser);

export default router; 