const prisma = require('../models/prismaClient')

async function createUser(name, password, updatedAt) {
    return await prisma.user.create({
        data: { name, password, updatedAt },
    });
}

async function getUsers() {
    return await prisma.user.findMany();
}

async function checkUsername(name) {
    return await prisma.user.findUnique({
        where: { name },
    });
}
module.exports = { createUser, getUsers, checkUsername };