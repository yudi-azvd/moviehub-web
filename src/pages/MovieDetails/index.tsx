import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';
import MovieActors from '../../components/MovieActors';

interface Actor {
  id: number;
  character: string;
  name: string;
  profilePath: string;
}

interface Movie {
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

const MovieDetails: React.FC<Props> = ({ match }: Props) => {
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
      <MovieBanner backgroundUrl={movie.backdropPath}>
        <MoviePoster>
          <img src={movie?.posterPath} alt={movie?.title} />
        </MoviePoster>

        <MovieInfo>
          <div className="title">
            <h1>{movie?.title}</h1>
            <p className="genre-runtime">
              {movie?.genres?.map((genre) => (
                <span key={`${genre}id`}>{`${genre} |`}</span>
              ))}
              <span> {movie?.runtime}m</span>
            </p>
          </div>

          <div className="vote-average">
            <div className="average">
              <big>{movie?.voteAverage * 10}</big>
              <small> %</small>
            </div>
            <p>Avaliação dos usuários</p>
          </div>

          <em className="tagline">{movie?.tagline}</em>
          <strong>Sinopse</strong>
          <section>{movie?.overview}</section>
        </MovieInfo>
      </MovieBanner>

      <MovieActors actors={movie?.cast} />
    </Container>
  );
};

export default MovieDetails;
