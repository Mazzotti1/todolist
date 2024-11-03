
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTasks, createTask } from '../../services/apiService';
import TaskList from '../../components/tasks/TaskList';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getTasks();
                setTasks(tasksData);
            } catch (error) {
                //fazer um popUp generico na utils
                console.error('Erro ao buscar tarefas:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        try {
            const createdTask = await createTask({ title: newTask });
            setTasks([...tasks, createdTask]);
            setNewTask(''); 
        } catch (error) {
            //fazer um popUp generico na utils
            console.error('Erro ao criar tarefa:', error);
        }
    };

    const handleNavigation = () => {
        navigate('/about'); 
    };

    return (
        <MainContainer >
            <ContentContainer>
                <TextContainer>
                    <h1>Olá!</h1>
                    <p>Vamos criar a primeira tarefa?</p>
                </TextContainer>
                <StyledButton onClick={handleNavigation}>
                    Sobre
                </StyledButton>
            </ContentContainer>
            <TaskList tasks={tasks}/>
        </MainContainer>
    );
};


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    color: #333;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width:'100%';
    height: 80vh;
    color: #333;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
`;

const StyledButton = styled.button`
    background-color: #000000; 
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top:15px;
    margin-bottom:15px;
    margin-left: 35px;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')}; 
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;

export default Main;