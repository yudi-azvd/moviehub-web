import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Router from './router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
