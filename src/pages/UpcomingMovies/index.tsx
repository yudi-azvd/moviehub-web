import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import getImage from '../../functions/getImage';

import { Container, MovieCard } from './styles';
import VoteAverage from '../../components/VoteAverage';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

const UpcomingMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies(): Promise<void> {
      const moviesResponse = await api.get<Movie[]>('/movies/upcoming');

      setMovies(moviesResponse.data);
    }

    loadMovies();
  }, []);

  return (
    <Container>
      <h2>Em breve</h2>

      <ul>
        {movies?.map((movie) => (
          <MovieCard key={movie.id}>
            <div>
              <a href={`/movies/${movie.id}`}>
                <img
                  src={`${getImage('miniPoster', movie.posterPath)}`}
                  alt={movie.title}
                />
              </a>

              <VoteAverage
                voteAverage={movie.voteAverage}
                size={36}
                positionAbsolute
              />

              <a href={`/movies/${movie.id}`}>
                <h3>{movie.title}</h3>
              </a>
            </div>
          </MovieCard>
        ))}
      </ul>
    </Container>
  );
};

export default UpcomingMovies;
