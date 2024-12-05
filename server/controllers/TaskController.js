import * as taskService from '../services/TasksService.js';
import * as userService from '../services/UserService.js';

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

const setTaskCompleted = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await taskService.setCompleteTask(id);

        const score = calculateScoreForTask(result);
        await userService.setUserScore(result.assignedTo, score);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao completar a tarefa.' });
    }
};

const calculateScoreForTask = (task) => {
    let score = 0;

    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilDue > 0) {
        score += Math.max(10 - daysUntilDue, 1);
    } else {
        score -= Math.abs(daysUntilDue);
    }

    switch (task.priority) {
        case 1:
            score += 10;
            break;
        case 2:
            score += 5;
            break;
        case 3:
            score += 2;
            break;
        default:
            score -= 3;
            break;
    }

    if(task.tags.length <= 0){
        score -= 3;
    }

    if (task.tags.includes("rápida")) {
        score += 2;
    }
    if (task.tags.includes("lenta")) {
        score += 4;
    }
    if (task.tags.includes("fácil")) {
        score += 2;
    }
    if (task.tags.includes("difícil")) {
        score += 6;
    }

    switch (task.category) {
        case "Trabalho":
            score += 8;
            break;
        case "Estudo":
            score += 6;
            break;
        case "Lazer":
            score += 3;
            break;
        default:
            score -= 3;
            break;
    }

    return score;
}

export default { createTask, getTasks, getTasksByUser, setTaskCompleted };
