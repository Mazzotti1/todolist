const userService = require('../services/UserService');
const { hashPassword } = require('../utils/PasswordEncoder');

const createUser = async (req, res) => {
    const { name, password, updateAt } = req.body;
    try {

        const userExists = await userService.checkUsername(name);
        
        if(userExists){
            return res.status(409).json({ error: 'O nome de usuário já está em uso.' });
        }
        
        const hashedPassword = await hashPassword(password);

        const user = await userService.createUser(name, hashedPassword, updateAt);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuario.' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os usuarios' });
    }
};

module.exports = { createUser, getUsers };