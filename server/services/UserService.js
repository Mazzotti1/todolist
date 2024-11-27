import prisma from '../models/prismaClient.js';
import { compare } from 'bcrypt';

export async function createUser(name, password, updatedAt) {
    return await prisma.user.create({
        data: { name, password, updatedAt },
    });
}

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function checkUsername(name) {
    return await prisma.user.findUnique({
        where: { name },
    });
}

export async function login(name, password) {
    const user = await prisma.user.findUnique({
        where: { name },
    });

    if (!user) return null;

    const isPasswordCorrect = await compare(password, user.password);

    return isPasswordCorrect ? user : null;
}