import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';

interface Movie {
  title?: string;
  overview?: string;
  tagline?: string;
  posterPath: string;
  backdropPath?: string;
  voteAverage: number;
  runtime: number;
  genres: string[];
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
          {/* Canvas no stack overflow */}
          {/* https://stackoverflow.com/questions/60424853/html-canvas-with-react-hooks-and-typescript */}
          <img src={movie?.posterPath} alt={movie?.title} />
        </MoviePoster>

        <MovieInfo>
          <h1>{movie?.title}</h1>
          <p>
            {movie?.genres?.map((genre) => (
              <span key={`${genre}id`}>{`${genre} |`}</span>
            ))}
            <span>{movie?.runtime}m</span>
          </p>

          <p className="rating">
            <big>{movie?.voteAverage * 10}</big>
            <small> &#160;/ 100</small>
          </p>

          <p className="tagline">{movie?.tagline}</p>

          <strong>Sinopse</strong>
          <section>{movie?.overview}</section>
        </MovieInfo>
      </MovieBanner>
    </Container>
  );
};

export default MovieDetails;
