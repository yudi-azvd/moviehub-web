import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import MovieActors from '../../components/MovieActors';
import MovieReviews from '../../components/MovieReviews';
import getImage from '../../helpers/getImage';
import VoteAverage from '../../components/VoteAverage';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';

interface Actor {
  id: number;
  character: string;
  name: string;
  profilePath: string;
}

interface Movie {
  id: string;
  title?: string;
  overview?: string;
  tagline?: string;
  posterPath: string;
  backdropPath?: string;
  voteAverage: number;
  runtime: number;
  genres: string[];
  cast: Actor[];
}

type Props = {
  match: {
    params: {
      id: string;
    };
  };
};

const MovieDetails: React.FC<Props> = ({ match }) => {
  const [movie, setMovie] = useState<Movie>({
    voteAverage: 0,
  } as Movie);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const response = await api.get<Movie>(`/movies/${match.params.id}`);
      setMovie(response.data);
    }

    loadMovie();
  }, [match.params.id]);

  return (
    <Container>
      <MovieBanner backgroundUrl={getImage('backdrop', movie?.backdropPath)}>
        <MoviePoster>
          <img src={getImage('poster', movie?.posterPath)} alt={movie?.title} />
        </MoviePoster>

        <MovieInfo>
          <div className="title">
            <h1>{movie?.title}</h1>
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
