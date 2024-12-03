import prisma from '../models/prismaClient.js';

async function createTask(title, description, priority, category, dueDate, tags, completed, assignedTo, updatedAt) {
    return await prisma.task.create({
        data: { title, description, priority, category, dueDate, tags, completed, assignedTo, updatedAt },
    });
}

async function getTasks() {
    return await prisma.task.findMany();
}

async function getTasksByUser(id) {
    return await prisma.task.findMany({
        where: {
            assignedTo: id,
        },
    });
}

export { createTask, getTasks, getTasksByUser };  
