import React, { createContext, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

const PopupContext = createContext();

export const usePopup = () => {
  return useContext(PopupContext); 
};

export const PopupProvider = ({ children }) => {
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupDuration, setPopupDuration] = useState(3000);

  const showPopup = (message, type, duration = 3000) => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupDuration(duration);

    setTimeout(() => {
      hidePopup();
    }, duration);
  };

  const hidePopup = () => {
    setPopupMessage('');
    setPopupType('');
  };

  return (
    <PopupContext.Provider value={{ popupMessage, popupType, showPopup, hidePopup }}>
      {children}
      {popupMessage && <Popup message={popupMessage} type={popupType} />}
    </PopupContext.Provider>
  );
};

const Popup = ({ message, type }) => {
  return (
    <PopupContainer type={type}>
      <PopupMessage>{message}</PopupMessage>
    </PopupContainer>
  );
};

export default Popup;

const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) =>
    props.type === 'success'
      ? 'lightgreen'
      : props.type === 'error'
      ? 'lightcoral'
      : props.type === 'warning'
      ? 'lightyellow'
      : 'white'};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  border-left: 5px solid
    ${(props) =>
      props.type === 'success'
        ? 'green'
        : props.type === 'error'
        ? 'red'
        : props.type === 'warning'
        ? 'yellow'
        : 'transparent'};
`;


const PopupMessage = styled.p`
  font-size: 14px;
  color: black;
`;
