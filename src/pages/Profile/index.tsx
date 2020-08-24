import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  FavoriteMoviesList,
  FavoriteMovie,
  DeleteIcon,
} from './styles';

const Profile: React.FC = () => {
  const { user, removeUserFavoriteMovie } = useAuth();

  return (
    <Container>
      <h2>Meu Perfil</h2>
      <h1>{user.name}</h1>

      <FavoriteMoviesList>
        <h3>Meus filmes favoritos</h3>

        {user.favoriteMovies?.length === 0 ? (
          <span> Você ainda não possui filmes favoritos </span>
        ) : (
          <>
            {user.favoriteMovies?.map((movie) => (
              <FavoriteMovie key={`m-${movie.id}`}>
                <button
                  type="button"
                  onClick={() =>
                    removeUserFavoriteMovie({
                      userId: user.id,
                      movieId: movie.id,
                    })
                  }
                >
                  <DeleteIcon />
                </button>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </FavoriteMovie>
            ))}
          </>
        )}
      </FavoriteMoviesList>
    </Container>
  );
};

export default Profile;
