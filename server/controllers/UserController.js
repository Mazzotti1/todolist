import * as userService from '../services/UserService.js';
import { hashPassword } from '../utils/PasswordEncoder.js';

const createUser = async (req, res) => {
    const { name, password, updateAt } = req.body;
    try {

        const userExists = await userService.checkUsername(name);
        
        if (userExists) {
            return res.status(409).json({ error: 'O nome de usuário já está em uso.' });
        }
        
        const hashedPassword = await hashPassword(password);

        const user = await userService.createUser(name, hashedPassword, updateAt);

        const { password: _, ...userWithoutPassword } = user; 

        
         res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os usuários.' });
    }
};

const login = async (req, res) => {
    const { name, password} = req.body;
    try {
        const response = await userService.login(name, password);
        
        if (response) {
            res.status(200).json({ status: true, message: "Usuário logado com sucesso", data:response.id });
        } else {
            res.status(200).json({ status: false, message: "Usuário ou senha incorretos", data:{} });
        }
       
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar login do usuário.' });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'O id do usuário é obrigatório.' });
    }

    try {
        const user = await userService.getUserById(id);

        if(user){
            res.json(user);
        }else{
            res.status(400).json({ error: 'Resultado invalido.' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }
}

export default { createUser, getUsers, login, getUserById};
