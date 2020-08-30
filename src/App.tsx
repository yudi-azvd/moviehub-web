import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';

import Router from './router';
import Header from './components/Header';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Router />
        <ToastContainer />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
