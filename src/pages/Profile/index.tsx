import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, MoviesList } from './styles';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Meu Perfil</h1>
      <h2>{user.name}</h2>

      <MoviesList>
        <h3>Meus filmes favoritos</h3>
        {user.favoriteMovies?.map((movie) => (
          <li>
            <Link key={`m-${movie.id}`} to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </MoviesList>
    </Container>
  );
};

export default Profile;
