import prisma from '../models/prismaClient.js';

async function createTask(title, description, priority, category, dueDate, tags, assignedTo, updatedAt) {
    return await prisma.task.create({
        data: { title, description, priority, category, dueDate, tags, assignedTo, updatedAt },
    });
}

async function getTasks() {
    return await prisma.task.findMany();
}

async function getTasksByUser(name) {
    return await prisma.task.findMany({
        where: {
            assignedTo: name,
        },
    });
}

export { createTask, getTasks, getTasksByUser };  
