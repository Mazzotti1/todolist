
import React from 'react';
import styled from 'styled-components';

const Main = () => {
    return (
        <MainContainer >
            <h1>Teste</h1>
            <p>Esta é a tela inicial.</p>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
    color: #333;
`;

export default Main;