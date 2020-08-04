import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import getImage from '../../functions/getImage';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
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
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          {movie.title}
          <img
            src={`${getImage('miniPoster', movie.posterPath)}`}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
};

export default UpcomingMovies;
