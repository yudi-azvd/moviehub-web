import React, { useEffect, useState, useCallback, ReactPropTypes } from 'react';
import { toast } from 'react-toastify';

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

interface Props extends ReactPropTypes {
  match: {
    params: {
      movieId: string;
    };
  };

  location: {
    state: {
      movie: Movie;
    };
  };
}

const MovieDetails: React.FC<Props> = ({ match, location }) => {
  const { user } = useAuth();

  const {
    addUserFavoriteMovie,
    removeUserFavoriteMovie,
    isMovieFavorite,
  } = useFavoriteMovies();

  const [movie, setMovie] = useState<Movie>(() => {
    if (!location?.state) return { voteAverage: 0 } as Movie;

    return location.state.movie;
  });

  const [movieIsFavorite, setMovieIsFavorite] = useState(
    () => !!user && isMovieFavorite(parseInt(match.params.movieId, 10)),
  );

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const { data } = await api.get<Movie>(`/movies/${match.params.movieId}`);

      setMovie(data);
    }

    // if (!location?.state?.movie) {
    loadMovie();
    // }
  }, [match.params.movieId, movie.id, isMovieFavorite, user]);

  const handleClickFavoriteIcon = useCallback(
    (isCurrentlyFavorite: boolean) => {
      if (!user) {
        toast(
          'Entre ou crie uma conta para adicionar um filme aos favoritos!',
          { type: 'info' },
        );

        return;
      }

      if (isCurrentlyFavorite) {
        removeUserFavoriteMovie(movie.id);
        toast('Filme removido dos favoritos com sucesso', {
          type: 'info',
        });
      } else {
        addUserFavoriteMovie({ id: movie.id, title: movie.title });
        toast('Filme adicionado aos favoritos com sucesso', {
          type: 'success',
        });
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
