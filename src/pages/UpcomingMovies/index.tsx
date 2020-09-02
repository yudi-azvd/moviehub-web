import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../entities';

import api from '../../services/api';
import getImage from '../../helpers/getImage';

import { Container, MovieCard, Movies } from './styles';
import VoteAverage from '../../components/VoteAverage';

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
      <h1>Em breve</h1>

      <Movies>
        {movies?.map((movie) => (
          <MovieCard key={movie.id}>
            <div>
              <Link to={{ pathname: `/movies/${movie.id}`, state: { movie } }}>
                <img
                  src={`${getImage('miniPoster', movie.posterPath)}`}
                  alt={movie.title}
                />
              </Link>

              <VoteAverage
                voteAverage={movie.voteAverage}
                size={36}
                positionAbsolute
              />

              <Link to={{ pathname: `/movies/${movie.id}`, state: { movie } }}>
                <h3>{movie.title}</h3>
              </Link>
            </div>
          </MovieCard>
        ))}
      </Movies>
    </Container>
  );
};

export default UpcomingMovies;
