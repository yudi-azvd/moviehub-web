import React, { useEffect, useState, useCallback } from 'react';

import api from '../../services/api';

import { Movie } from '../../entities';

import { useAuth } from '../../hooks/auth';

import FavoriteIcon from '../../components/FavoriteIcon';
import MovieActors from '../../components/MovieActors';
import MovieReviews from '../../components/MovieReviews';
import getImage from '../../helpers/getImage';
import VoteAverage from '../../components/VoteAverage';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';

type Props = {
  match: {
    params: {
      id: string;
    };
  };
};

const MovieDetails: React.FC<Props> = ({ match }) => {
  const { user, addUserFavoriteMovie, removeUserFavoriteMovie } = useAuth();
  const [movie, setMovie] = useState<Movie>({
    voteAverage: 0,
  } as Movie);
  const [movieIsFavorite, setMovieIsFavorite] = useState(
    !!user.favoriteMovies?.find((userFavMovie) => userFavMovie.id === movie.id),
  );

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const response = await api.get<Movie>(`/movies/${match.params.id}`);
      setMovie(response.data);
    }

    loadMovie();
  }, [match.params.id]);

  const handleClickFavoriteIcon = useCallback(
    (wasFavorite: boolean) => {
      console.log('handle click top level');

      if (wasFavorite) {
        addUserFavoriteMovie({ userId: user.id, movieId: movie.id });
      } else {
        removeUserFavoriteMovie({ userId: user.id, movieId: movie.id });
      }

      setMovieIsFavorite(!wasFavorite);
    },
    [addUserFavoriteMovie, removeUserFavoriteMovie, user.id, movie.id],
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
                isActive={!!user && movieIsFavorite}
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

      <MovieReviews movieId={match.params.id} />
    </Container>
  );
};

export default MovieDetails;
