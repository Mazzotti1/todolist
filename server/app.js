// app.js
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/TaskRoutes.js';
import userRoutes from './routes/UserRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);  


export default app;