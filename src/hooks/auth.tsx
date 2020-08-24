import React, { useState, createContext, useContext, useCallback } from 'react';

import { Movie } from '../entities';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  favoriteMovies?: Movie[];
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserFavoriteMovie {
  userId: number;
  movieId: number;
}

interface AuthContextInterface {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  addUserFavoriteMovie(data: UserFavoriteMovie): Promise<void>;
  removeUserFavoriteMovie(data: UserFavoriteMovie): Promise<void>;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@moviehub:token');
    const user = localStorage.getItem('@moviehub:user');

    if (!token || !user) {
      return {} as AuthState;
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    return {
      token,
      user: JSON.parse(user) as User,
    };
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@moviehub:token', token);
    localStorage.setItem('@moviehub:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@moviehub:token');
    localStorage.removeItem('@moviehub:user');

    delete api.defaults.headers.authorization;

    setData({} as AuthState);
  }, []);

  const addUserFavoriteMovie = useCallback(async ({ userId, movieId }) => {
    await api.post(`/users/${userId}/favorite_movies`, {
      movie_id: movieId,
    });
  }, []);

  const removeUserFavoriteMovie = useCallback(
    async ({ userId, movieId }) => {
      await api.delete(`/users/${userId}/favorite_movies/`, {
        data: {
          movie_id: movieId,
        },
      });

      const remainingFavoriteMovies = data.user.favoriteMovies?.filter(
        (movie) => movie.id !== movieId,
      );

      localStorage.setItem(
        '@moviehub:user',
        JSON.stringify({
          ...data.user,
          favoriteMovies: remainingFavoriteMovies,
        }),
      );

      setData({
        ...data,
        user: {
          ...data.user,
          favoriteMovies: remainingFavoriteMovies,
        },
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        addUserFavoriteMovie,
        removeUserFavoriteMovie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
