
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTasksById, createTask } from '../../services/apiService';
import TaskList from '../../components/tasks/TaskList';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import CreateTaskDialog from '../../components/dialogs/CreateTaskDialog';
import { usePopup } from '../../utils/Popup';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import RegisterDialog from '../../components/dialogs/RegisterDialog';

const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [triggerEffect, setTriggerEffect] = useState(false);

    const navigate = useNavigate();
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

    const { showPopup } = usePopup();

    const handleClickOpenDialog = () => {
        setOpenTaskDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenTaskDialog(false);
    };

    const handleTaskCreated = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setFilteredTasks((prevTasks) => [...prevTasks, newTask]);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getTasksById();
                setTasks(tasksData);
                setFilteredTasks(tasksData);
            } catch (error) {
                showPopup(error.response.data.error, 'error'); 
            }
        };

        fetchTasks();
    }, [triggerEffect]);

    const handleNavigationAbout = () => {
        navigate('/about'); 
    };

    const handleNavigationRanking = () => {
        navigate('/ranking'); 
    };

    const handleLogout = () => {
        localStorage.removeItem('session');
        setTriggerEffect((prev) => !prev);
    };

    const openRegister = () => {
        setOpenRegisterDialog(true);
    };
    
    const closeRegisterDialog = () => {
        setOpenRegisterDialog(false);
        setTriggerEffect((prev) => !prev);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = tasks.filter((task) => task.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredTasks(filtered);
    };

    return (
        <MainContainer>
        <ContentContainer>
            <TextContainer>
                <h1 style={{fontSize:'42px'}}>Bem vindo!</h1>
                <p style={{fontSize:'28px'}}>Comece hoje mesmo criando tarefas para se organizar e ainda sim competir com outras pessoas pelo topo do ranking!</p>
            </TextContainer>
            <ButtonsRow>
                <StyledButton onClick={handleNavigationAbout}>
                    Entenda mais sobre!
                </StyledButton>
                <StyledButton onClick={handleNavigationRanking}>
                    Ranking
                </StyledButton>

            </ButtonsRow>
            <LargeButton onClick={handleClickOpenDialog}>
                <AddIcon style={{ marginRight: '8px' }} />
                Adicionar tarefa
            </LargeButton>
            <ButtonsRow>

            {!localStorage.getItem('session') && (
                <IconButton onClick={openRegister}>
                    <LoginIcon style={{color:'green'}}/>
                </IconButton>
            )}

            {localStorage.getItem('session') && (
                <IconButton onClick={handleLogout}>
                    <LogoutIcon style={{color:'red'}} />
                </IconButton>
            )}
                
            </ButtonsRow>

            {localStorage.getItem('session') && (
                <TextField
                    label="Pesquisar Tarefa"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginTop: '20px' }}
                />
            )}
        </ContentContainer>
        <TaskList tasks={filteredTasks} />

        <CreateTaskDialog open={openTaskDialog} handleClose={handleCloseDialog} onTaskCreated={handleTaskCreated}/>
        <RegisterDialog 
            open={openRegisterDialog} 
            onClose={closeRegisterDialog} 
            onRegister={closeRegisterDialog} 
        />
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

const IconButton = styled.button`
    background-color: #2C3E50;
    color: white;
    border: none;
    width: 60px;
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