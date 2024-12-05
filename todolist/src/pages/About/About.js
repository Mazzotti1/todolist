import React from 'react';
import styled from 'styled-components';
import BookIcon from '@mui/icons-material/EventAvailable';

const About = () => {
    return (
        <MainContainer>
            <ContentContainer>
                <TextContainer>
                    <h1>Desafie a si mesmo, supere a todos!</h1>
                    <p>
                        Para transformar sua organização diária em um desafio envolvente, criamos esta Lista de Tarefas. À
                        primeira vista, ela parece simples, mas nosso sistema de pontuação e ranking inspira você a ir além,
                        competindo e conquistando novas metas a cada tarefa concluída!
                    </p>
                    <StyledBookIcon />
                    <p>
                        Desenvolvido por Gabriel Mazzotti, Joao Vitor Nunes, Joao Pedro Carneiro e Crysthian Pimentel dos
                        Santos.
                    </p>
                </TextContainer>
            </ContentContainer>
        </MainContainer>
    );
};

export default About;

const MainContainer = styled.div`
    display: flex;
    height: auto;
    min-height: 80vh;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
    padding: 20px; 
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
    width: 90%; 
    max-width: 900px; 
    gap: 20px;
    justify-content: center;
    color: #333;

    h1 {
        font-size: 2.5rem;
        line-height: 1.3;
    }

    p {
        font-size: 1.2rem;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem; 
        }

        p {
            font-size: 1rem; 
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 1.8rem;
        }

        p {
            font-size: 0.9rem; 
        }
    }
`;

const StyledBookIcon = styled(BookIcon)`
    width: 200px;
    height: 100px;

    @media (max-width: 768px) {
        width: 150px;
        height: 80px;
    }

    @media (max-width: 480px) {
        width: 100px;
        height: 50px;
    }
`;
