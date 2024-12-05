import prisma from '../models/prismaClient.js';
import { compare } from 'bcrypt';

export async function createUser(name, password, updatedAt) {
    return await prisma.user.create({
        data: { name, password, updatedAt },
    });
}

export async function getUsers() {
    return await prisma.user.findMany({
        orderBy: {
            score: 'desc', 
        },
        take: 10, 
    });
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

export async function setUserScore(idUser, score){
    await prisma.user.update({
        where:{
            id:idUser
        },
        data:{
            score:score
        }
    })
}

export async function getUserById(id){
    return await prisma.user.findMany({
        where:{
            id:id
        }
    })
}

