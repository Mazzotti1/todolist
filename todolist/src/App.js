import React from 'react';
import AppRouter from './context/Router';
import { GlobalStyles } from './utils/GlobalStyles';

const App = () => {
  return (
      <>
          <GlobalStyles />
          <AppRouter />
      </>
  );
};

export default App;
