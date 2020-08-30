import React from 'react';

import { AuthProvider } from './auth';
import { FavoriteMoviesProvider } from './favoriteMovies';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <FavoriteMoviesProvider>{children}</FavoriteMoviesProvider>
  </AuthProvider>
);

export default AppProvider;
