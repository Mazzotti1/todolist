
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
    const navigate = useNavigate();

    return (
        <MainContainer >  
            <h1>Ranking!</h1>
        </MainContainer>
    );
};

export default Ranking;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    color: #333;
`;