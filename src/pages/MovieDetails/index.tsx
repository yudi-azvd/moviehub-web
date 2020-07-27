import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import {
  Container,
  MovieBanner,
  MovieBackdrop,
  MoviePoster,
  MovieInfo,
} from './styles';

interface Movie {
  title?: string;
  overview?: string;
  tagline?: string;
  posterPath?: string;
  backdropPath?: string;
  voteAverage: number;
}

const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<Movie>({
    voteAverage: 0,
  } as Movie);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const response = await api.get<Movie>('/movies/550');
      setMovie(response.data);
    }

    loadMovie();
  }, []);

  return (
    <Container>
      <MovieBackdrop>
        {/* <img src={movie?.backdropPath} alt={movie?.title} /> */}
      </MovieBackdrop>
      <MovieBanner backgroundUrl={movie.backdropPath}>
        <MoviePoster>
          <img src={movie?.posterPath} alt={movie?.title} />
        </MoviePoster>

        <MovieInfo>
          <h1>{movie?.title}</h1>
          <p>{movie?.tagline}</p>
          <strong>Sinopse</strong>
          <p>{movie?.overview}</p>
          <p>
            {movie?.voteAverage * 10}
            /100
          </p>
        </MovieInfo>
      </MovieBanner>
    </Container>
  );
};

export default MovieDetails;
