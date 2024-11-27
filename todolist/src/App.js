import React from 'react';
import AppRouter from './context/Router';
import { GlobalStyles } from './utils/GlobalStyles';
import { PopupProvider } from './utils/Popup';

const App = () => {
  return (
      <>
       <PopupProvider>
          <GlobalStyles />
          <AppRouter />
       </PopupProvider>
      </>
  );
};

export default App;
