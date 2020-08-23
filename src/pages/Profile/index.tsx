import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Meu Perfil</h1>
      <h3>{user.name}</h3>

      <ul>
        {user.favoriteMovies?.map((movie) => (
          <li key={`m-${movie.id}`}> {movie.title} </li>
        ))}
      </ul>
    </Container>
  );
};

export default Profile;
