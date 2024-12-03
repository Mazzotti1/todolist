import React from 'react';
import styled from 'styled-components';

const TaskList = ({ tasks }) => {

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
    width:1760px;
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row; 
    gap: 15px;
`;

const StyledListItem = styled.li`
    min-width: 300px;
    flex-shrink: 0;
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
    border-left: 5px solid
    ${(props) => {
        switch (props.priority) {
            case 1:
                return '#842029';
            case 2:
                return '#856404';
            case 3:
                return '#0f5132';
            default:
                return '#6c757d'; 
        }
    }};
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.02);
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
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

export default TaskList;
