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
        let session = JSON.parse(localStorage.getItem('session'));
        let id = session.id;

        const formattedData = {
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority === 'high' ? 1 : taskData.priority === 'medium' ? 2 : taskData.priority === 'low' ? 3 : 0,
            category: taskData.category,
            dueDate: new Date(taskData.dueDate).toISOString(),
            tags: taskData.tags,
            assignedTo: id,
            updatedAt: new Date().toISOString()
        };

        const response = await api.post('/tasks', formattedData);
        return response.data;
    } catch (error) {
        throw error; 
    }
};

export const createUser = async (name, password) => {
    try {

        const registerBody = {
            name: name,
            password: password
        }

        const response = await api.post('/user', registerBody);
    
        return response.data;
    } catch (error) {
        throw error; 
    }
};

export const loginUser = async (name,password) => {
    try {
        const registerBody = {
            name: name,
            password: password
        }

        const response = await api.post('/user/login', registerBody);

        return response.data;
    } catch (error) {
        throw error;
    }
}
