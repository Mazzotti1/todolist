
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
    const [completed, setCompleted] = useState(false);

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
        setTasks((prevTasks) => (Array.isArray(prevTasks) ? [...prevTasks, newTask] : [newTask]));
        setFilteredTasks((prevTasks) => (Array.isArray(prevTasks) ? [...prevTasks, newTask] : [newTask]));
    };
    

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getTasksById();
                setTasks(tasksData);
                setFilteredTasks(tasksData);
                setCompleted(false);
            } catch (error) {
                showPopup(error.response.data.error, 'error'); 
            }
        };

        fetchTasks();
    }, [triggerEffect, completed]);

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
        <TaskList tasks={filteredTasks} setCompleted={setCompleted} />

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f9f9f9;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    width: 100%;
    max-width: 900px;

    @media (max-width: 768px) {
        gap: 15px;
    }

    @media (max-width: 480px) {
        gap: 10px;
    }
`;


const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 900px;
    gap: 20px;

    h1 {
        font-size: 2em;

        @media (max-width: 768px) {
            font-size: 1.5em;
        }

        @media (max-width: 480px) {
            font-size: 1.2em;
        }
    }

    p {
        font-size: 1.2em;

        @media (max-width: 768px) {
            font-size: 1em;
        }

        @media (max-width: 480px) {
            font-size: 0.9em;
        }
    }
`;


const ButtonsRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 480px) {
        gap: 10px;
    }
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

    @media (max-width: 768px) {
        width: 150px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        width: 120px;
        font-size: 12px;
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
    width: 50%;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 70%;
        height: 50px;
    }

    @media (max-width: 480px) {
        width: 90%;
        height: 45px;
    }
`;



export default Main;