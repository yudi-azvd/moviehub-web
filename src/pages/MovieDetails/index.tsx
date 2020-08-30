import React, { useEffect, useState, useCallback } from 'react';

import api from '../../services/api';

import { Movie } from '../../entities';

import { useAuth } from '../../hooks/auth';
import { useFavoriteMovies } from '../../hooks/favoriteMovies';

import FavoriteIcon from '../../components/FavoriteIcon';
import MovieActors from '../../components/MovieActors';
import MovieReviews from '../../components/MovieReviews';
import getImage from '../../helpers/getImage';
import VoteAverage from '../../components/VoteAverage';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';

interface Props {
  match: {
    params: {
      movieId: string;
    };
  };
}

const MovieDetails: React.FC<Props> = ({ match }) => {
  const { user } = useAuth();

  const {
    addUserFavoriteMovie,
    removeUserFavoriteMovie,
    isMovieFavorite,
  } = useFavoriteMovies();

  const [movie, setMovie] = useState<Movie>({
    voteAverage: 0,
  } as Movie);

  const [movieIsFavorite, setMovieIsFavorite] = useState(
    () => !!user && isMovieFavorite(parseInt(match.params.movieId, 10)),
  );

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const { data } = await api.get<Movie>(`/movies/${match.params.movieId}`);

      setMovie(data);
    }

    loadMovie();
  }, [match.params.movieId, movie.id, isMovieFavorite, user]);

  const handleClickFavoriteIcon = useCallback(
    (isCurrentlyFavorite: boolean) => {
      if (!user) {
        console.log(
          'entre ou crie uma conta pra adicionar um filme aos favoritos',
        );
        return;
      }

      if (isCurrentlyFavorite) {
        removeUserFavoriteMovie(movie.id);
      } else {
        addUserFavoriteMovie({ id: movie.id, title: movie.title });
      }

      setMovieIsFavorite(!isCurrentlyFavorite);
    },
    [
      addUserFavoriteMovie,
      removeUserFavoriteMovie,
      movie.id,
      movie.title,
      user,
    ],
  );

  return (
    <Container>
      <MovieBanner backgroundUrl={getImage('backdrop', movie?.backdropPath)}>
        <MoviePoster>
          <img src={getImage('poster', movie?.posterPath)} alt={movie?.title} />
        </MoviePoster>

        <MovieInfo>
          <div className="title">
            <div className="header">
              <FavoriteIcon
                onClick={handleClickFavoriteIcon}
                isActive={movieIsFavorite}
              />
              <h1>{movie?.title}</h1>
            </div>

            <p className="genre-runtime">
              {movie?.genres?.map((genre) => (
                <span key={`${genre}id`}>{`${genre}`}</span>
              ))}
              <span className="runtime"> {movie?.runtime}m</span>
            </p>
          </div>

          <div className="vote-average">
            <VoteAverage voteAverage={movie?.voteAverage} />
            <p>Avaliação dos usuários</p>
          </div>

          <em className="tagline">{movie?.tagline}</em>
          <strong>Sinopse</strong>
          <section>{movie?.overview}</section>
        </MovieInfo>
      </MovieBanner>

      <MovieActors actors={movie?.cast} />

      <MovieReviews movieId={match.params.movieId} />
    </Container>
  );
};

export default MovieDetails;
