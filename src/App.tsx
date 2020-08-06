import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Router from './router';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
