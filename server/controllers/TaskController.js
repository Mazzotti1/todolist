import * as taskService from '../services/TasksService.js';

const createTask = async (req, res) => {
    const { title, description, priority, category, dueDate, tags, completed, assignedTo, updatedAt } = req.body;
    try {
        const task = await taskService.createTask(title, description, priority, category, dueDate, tags, completed ,assignedTo, updatedAt);
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a tarefa.' });
    }
};
 
const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as tarefas.' });
    }
};

const getTasksByUser = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'O id do usuário é obrigatório.' });
    }

    try {
        const tasks = await taskService.getTasksByUser(id);

        if(tasks.length > 0){
            res.json(tasks);
        } else {
            res.json({ resultado: 'Nenhuma tarefa encontrada.' });
        }

    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar as tarefas do usuário'});
    }
};

export default { createTask, getTasks, getTasksByUser };
