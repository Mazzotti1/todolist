import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { getUserById, getUsersRanking } from '../../services/apiService';
import { usePopup } from '../../utils/Popup';

const Ranking = () => {
    const { showPopup } = usePopup();
    const [userPosition, setUserPosition] = useState(null);
    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
        const fetchRankingUsers = async () => {
            try {
                const rankingUsers = await getUsersRanking();
                setRankingData(rankingUsers);     
            } catch (error) {
                showPopup(error.response.data.error, 'error'); 
            }
        };

        fetchRankingUsers();
    }, []);

    useEffect(() => {
        const fetchUserPosition = async () => {
            try {
                const userData = await getUserById();
                setUserPosition(userData[0]);
            } catch (error) {
                showPopup(error.response.data.error, 'error'); 
            }
        };

        fetchUserPosition();
    }, []);

    const fullRanking = userPosition 
    ? [...rankingData.filter((entry) => entry.id !== userPosition.id), userPosition]
          .sort((a, b) => b.score - a.score)
    : rankingData;


    const top10 = fullRanking.slice(0, 10);

    const isUserInTop10 = userPosition 
    ? top10.some((entry) => entry.id === userPosition.id) 
    : false;

    const userRank = userPosition && !isUserInTop10 
    ? fullRanking.findIndex((entry) => entry.id === userPosition.id) + 1
    : null;

    return (
        <MainContainer hasUserPosition={!isUserInTop10 && userRank}>
            <h1>Ranking</h1>
            <RankingList>
                {top10.map((entry, index) => (
                    <RankingItem key={entry.id}>
                        <LeftSection>
                            <Position>{index + 1}</Position>
                        </LeftSection>
                        <MiddleSection>{entry.name}</MiddleSection>
                        <RightSection>{entry.score}</RightSection>
                    </RankingItem>
                ))}
            </RankingList>
            {!isUserInTop10 && userRank && (
                <UserPosition>
                    <RankingItem>
                        <LeftSection>
                            <Position>{userRank}</Position>
                        </LeftSection>
                        <MiddleSection>{userPosition.name}</MiddleSection>
                        <RightSection>{userPosition.score}</RightSection>
                    </RankingItem>
                </UserPosition>
            )}
        </MainContainer>
    );    
};

export default Ranking;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${({ hasUserPosition }) => (hasUserPosition ? 'flex-start' : 'center')};
    padding: 20px;
    height: 100vh;
    color: #333;
    background-color: #f9f9f9;

    h1 {
        font-size: 2rem;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        padding: 10px;
        h1 {
            font-size: 1.5rem;
        }
    }
`;

const RankingList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

const RankingItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
`;

const Position = styled.span`
    font-weight: bold;
    font-size: 1.2rem;
    color: #555;
`;

const MiddleSection = styled.div`
    flex: 1;
    text-align: left;
    padding-left: 10px;
    font-size: 1rem;
    color: #333;
`;

const RightSection = styled.div`
    width: 20%;
    text-align: right;
    font-weight: bold;
    font-size: 1rem;
    color: #007bff;
`;

const UserPosition = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 600px;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;

