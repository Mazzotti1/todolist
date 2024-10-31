import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_ENV === 'PROD'
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL_LOCAL;

console.log('API Base URL:', API_BASE_URL);


const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const getTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error; 
    }
};

