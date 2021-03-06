import React, { useState, createContext, useContext, useCallback } from 'react';

import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthContextInterface {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUpAndSignIn(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
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

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
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

  const signUpAndSignIn = useCallback(
    async ({ name, email, password }: SignUpCredentials) => {
      await api.post('/users', { name, email, password });

      await signIn({ email, password });
    },
    [signIn],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@moviehub:token');
    localStorage.removeItem('@moviehub:user');

    delete api.defaults.headers.authorization;

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signUpAndSignIn,
        signOut,
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
