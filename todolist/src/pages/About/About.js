
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookIcon from '@mui/icons-material/EventAvailable';
const About = () => {

    return (
        <MainContainer>
        <ContentContainer>
            <TextContainer>
                <h1 style={{fontSize:'42px'}}>Desafie a si mesmo, supere a todos!</h1>
                <p style={{fontSize:'28px'}}>Para transformar sua organização diária em um desafio envolvente, criamos esta Lista de Tarefas. À primeira vista, ela parece simples, mas nosso sistema de pontuação e ranking inspira você a ir além, competindo e conquistando novas metas a cada tarefa concluída!</p>
                <BookIcon style={{width:400, height:200}}></BookIcon>
                <p style={{fontSize:'22px'}}>Desenvolvido por Gabriel Mazzotti, Joao Vitor Nunes, Joao Pedro Carneiro e Crysthian Pimentel dos Santos.</p>
            </TextContainer>
        </ContentContainer>
    </MainContainer>
    );
};

export default About;

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


