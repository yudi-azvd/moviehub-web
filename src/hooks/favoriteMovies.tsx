import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import { SimpleMovie, Movie } from '../entities';

import { useAuth } from './auth';
import api from '../services/api';

/**
 * Ainda preciso me decidir se esse contexto precisa mesmo
 * guardar os filmes favoritos no localStorage.
 */
interface FavoriteMoviesInterface {
  favoriteMovies: SimpleMovie[];
  addUserFavoriteMovie(simpleMovie: SimpleMovie): Promise<void>;
  removeUserFavoriteMovie(simpleMovieId: number): Promise<void>;
  isMovieFavorite(movieId: number): boolean;
}

const FavoriteMoviesContext = createContext<FavoriteMoviesInterface>(
  {} as FavoriteMoviesInterface,
);

const FavoriteMoviesProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<SimpleMovie[]>(() => {
    if (!user) return [];

    const movies = localStorage.getItem('@moviehub:favoriteMovies');

    if (!movies) return [];

    return JSON.parse(movies) as SimpleMovie[];
  });

  useEffect(() => {
    async function loadFavoriteMovies(): Promise<void> {
      const response = await api.get<Movie[]>(
        `/users/${user.id}/favorite_movies`,
      );

      localStorage.setItem(
        '@moviehub:favoriteMovies',
        JSON.stringify(
          response.data.map((movie) => ({
            id: movie.id,
            title: movie.title,
          })),
        ),
      );

      setFavoriteMovies(response.data);
    }

    if (user) loadFavoriteMovies();
  }, [user]);

  const addUserFavoriteMovie = useCallback(
    async (simpleMovie: SimpleMovie) => {
      await api.post(`/users/${user.id}/favorite_movies`, {
        movie_id: simpleMovie.id,
      });

      const newFavoriteMovies = [simpleMovie].concat(favoriteMovies);

      localStorage.setItem(
        '@moviehub:favoriteMovies',
        JSON.stringify(newFavoriteMovies),
      );

      setFavoriteMovies(newFavoriteMovies);
    },
    [favoriteMovies, user],
  );

  const removeUserFavoriteMovie = useCallback(
    async (movieId: number) => {
      await api.delete(`/users/${user.id}/favorite_movies/`, {
        data: {
          movie_id: movieId,
        },
      });

      const remainingFavoriteMovies = favoriteMovies.filter(
        (movie) => movie.id !== movieId,
      );

      localStorage.setItem(
        '@moviehub:favoriteMovies',
        JSON.stringify(remainingFavoriteMovies),
      );

      setFavoriteMovies(remainingFavoriteMovies);
    },
    [favoriteMovies, user],
  );

  const isMovieFavorite = useCallback(
    (movieId: number) => {
      console.log(
        { favoriteMovies, movieId },
        !!favoriteMovies.find((favMovie) => favMovie.id === movieId),
        favoriteMovies[0],
      );

      return !!favoriteMovies.find((favMovie) => favMovie.id === movieId);
    },
    [favoriteMovies],
  );

  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        addUserFavoriteMovie,
        removeUserFavoriteMovie,
        isMovieFavorite,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

function useFavoriteMovies(): FavoriteMoviesInterface {
  const context = useContext(FavoriteMoviesContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export { FavoriteMoviesProvider, useFavoriteMovies };
