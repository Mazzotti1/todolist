const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Teste server'); 
});

app.post('/api/tasks', async (req, res) => {
    const { title } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                title,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a tarefa.' }); 
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as tarefas.' });
    }
});


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});