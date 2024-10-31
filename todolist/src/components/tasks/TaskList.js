import React from 'react';
import styled from 'styled-components';

const TaskList = ({ tasks }) => {
    return (
        <ListContainer>
            <StyledList>
                {tasks.map((task) => (
                    <StyledListItem key={task.id}>
                        {task.title}
                    </StyledListItem>
                ))}
            </StyledList>
        </ListContainer>
    );
};

const ListContainer = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const StyledListItem = styled.li`
    padding: 15px;
    margin: 10px 0;
    background-color: #f9f9f9;
    border-radius: 5px; 
    transition: background-color 0.3s; 

    &:hover {
        background-color: #e0e0e0; 
    }
`;

export default TaskList;
