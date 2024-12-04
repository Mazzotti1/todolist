import React from 'react';
import styled from 'styled-components';
import {completeTask } from '../../services/apiService';
import { usePopup } from '../../utils/Popup';

const TaskList = ({ tasks = [], setCompleted }) => {
    const { showPopup } = usePopup();

    if (!Array.isArray(tasks)) {
        return;
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed - b.completed; 
        }

        const dueDateA = new Date(a.dueDate);
        const dueDateB = new Date(b.dueDate);

        if (dueDateA < dueDateB) return -1;
        if (dueDateA > dueDateB) return 1;

        return a.priority - b.priority;
    });

    const handleCompleteTask = async (task) => {
        try {
            const createdTask = await completeTask(task.id);

            if(createdTask){
                setCompleted(true);
            }

        } catch (error) {
            showPopup(error.response.data.error, 'error'); 
        }
    }

    return (
        <ListContainer>
            <StyledList>
                {sortedTasks.map((task) => (
                    <StyledListItem key={task.id} completed={task.completed} priority={task.priority}>
                        <Header>
                            <Title>{task.title}</Title>
                            <Status completed={task.completed}>
                                {task.completed ? 'Completa' : 'Pendente'}
                            </Status>
                        </Header>
                        <Description>{task.description}</Description>
                        <Details>
                            <PriorityTag priority={task.priority}>
                                Prioridade
                            </PriorityTag>
                            <CategoryTag>Categoria: {task.category}</CategoryTag>
                            <CategoryTag>Limite: {new Date(task.dueDate).toLocaleDateString()}</CategoryTag>
                        </Details>
                        <TagList>
                            {task.tags.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                            ))}
                        </TagList>
                        {!task.completed && (
                            <StyledButton onClick={() => handleCompleteTask(task)}>
                                Completar
                            </StyledButton>
                        )}

                    </StyledListItem>
                ))}
            </StyledList>
        </ListContainer>
    );
};

const ListContainer = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row; 
    gap: 15px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


const StyledListItem = styled.li`
    min-width: 300px;
    flex-shrink: 0;
    flex-grow: 1; /* Permite que os itens cresçam conforme o espaço disponível */
    padding: 20px;
    background-color: ${(props) => {
        switch (props.priority) {
            case 1:
                return '#f8d7da';
            case 2:
                return '#fff3cd';
            case 3:
                return '#d4edda';
            default:
                return '#e2e3e5';
        }
    }};
    border-radius: 5px;

    @media (max-width: 768px) {
        min-width: 100%; /* Ocupa toda a largura da tela em dispositivos menores */
    }
`;


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        flex-direction: column; /* Alinha o cabeçalho em uma coluna */
        gap: 5px;
    }
`;

const Title = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #343a40;
`;

const Status = styled.span`
    font-size: 14px;
    color: ${(props) => (props.completed ? '#155724' : '#856404')};
    background-color: ${(props) => (props.completed ? '#d4edda' : '#fff3cd')};
    padding: 5px 10px;
    border-radius: 5px;
`;

const Description = styled.p`
    margin: 10px 0;
    color: #495057;
    font-size: 14px;
`;

const Details = styled.div`
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 768px) {
        flex-direction: column; /* Detalhes em uma coluna no mobile */
    }
`;
const PriorityTag = styled.span`
    font-size: 12px;
    color: #fff;
    background-color: ${(props) => {
        switch (props.priority) {
            case 1:
                return '#dc3545';
            case 2:
                return '#ffc107';
            case 3:
                return '#198754';
            default:
                return '#6c757d';
        }
    }};
    padding: 5px 8px;
    border-radius: 12px;
`;

const CategoryTag = styled.span`
    font-size: 12px;
    color: #00000;
    background-color: #faf0f0;
    padding: 5px 8px;
    border-radius: 12px;
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Tag = styled.span`
    font-size: 12px;
    color: #fff;
    background-color: #6c757d;
    padding: 5px 8px;
    border-radius: 12px;
`;

const StyledButton = styled.button`
    background-color: #05f04f;
    color: white;
    border: none;
    width: 100%; /* Adapta à largura disponível */
    max-width: 200px; /* Define um limite máximo */
    border-radius: 5px;
    padding: 0.8em;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    margin-top:15px;
    
    &:hover {
        background-color: #3de070;
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        width: 100%; /* O botão ocupa toda a largura */
    }
`;


export default TaskList;
