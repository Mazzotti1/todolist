
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTasks, createTask } from '../../services/apiService';
import TaskList from '../../components/tasks/TaskList';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CreateTaskDialog from '../../components/dialogs/CreateTaskDialog';

const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const navigate = useNavigate();
    const [openTaskDialog, setOpenTaskDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenTaskDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenTaskDialog(false);
    };


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

    const handleNavigationAbout = () => {
        navigate('/about'); 
    };

    const handleNavigationRanking = () => {
        navigate('/ranking'); 
    };

    return (
<<<<<<< Updated upstream
        <MainContainer >
            <ContentContainer>
                <TextContainer>
                    <h1>Olá!</h1>
                    <p>Vamos criar a primeira tarefa?</p>
                </TextContainer>
                <StyledButton onClick={handleNavigation}>
                    Sobre
=======
        <MainContainer>
        <ContentContainer>
            <TextContainer>
                <h1 style={{fontSize:'42px'}}>Bem vindo!</h1>
                <p style={{fontSize:'28px'}}>Comece hoje mesmo criando tarefas para se organizar e ainda sim competir com outras pessoas pelo topo do ranking!</p>
            </TextContainer>
            <ButtonsRow>
                <StyledButton onClick={handleNavigationAbout}>
                    Entenda mais sobre!
>>>>>>> Stashed changes
                </StyledButton>
                <StyledButton onClick={handleNavigationRanking}>
                    Ranking
                </StyledButton>
            </ButtonsRow>
            <LargeButton onClick={handleClickOpenDialog}>
                <AddIcon style={{ marginRight: '8px' }} />
                Adicionar tarefa
            </LargeButton>
        </ContentContainer>
        <TaskList tasks={tasks} />

        <CreateTaskDialog open={openTaskDialog} handleClose={handleCloseDialog}/>

    </MainContainer>
    );
};

const MainContainer = styled.div`
    display: flex;
    height: 80vh;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #333;
    gap: 20px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
    gap: 20px;
    justify-content: center;
    color: #333;
`;

const ButtonsRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
`;

const StyledButton = styled.button`
    background-color: #2C3E50;
    color: white;
    border: none;
    width: 200px;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;

const LargeButton = styled(StyledButton)`
    width: 25%;
    height: 55px;
    margin-top: 20px;
    background-color: #4A90E2 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #84BDFF !important;
        color: black !important;
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;


export default Main;