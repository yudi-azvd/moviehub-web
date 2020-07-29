import React, { useEffect, useState, useRef, useCallback } from 'react';
import { darken, getLuminance } from 'polished';

import api from '../../services/api';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';
import {
  ggetDominantColor,
  ggetDominantColor2,
  ggetDominantColor3,
} from './dominantColor';

interface Movie {
  title?: string;
  overview?: string;
  tagline?: string;
  posterPath: string;
  backdropPath?: string;
  voteAverage: number;
}

type Props = {
  match: {
    params: {
      id: string;
    };
  };
};

const MovieDetails: React.FC<Props> = ({ match }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  const [color, setColor] = useState('#0000');
  const [movie, setMovie] = useState<Movie>({
    voteAverage: 0,
  } as Movie);

  // useMemo não ta indo direito
  const context = canvasRef.current?.getContext('2d');

  const getDominantColor = useCallback(() => ggetDominantColor(context), [
    context,
  ]);

  const getDominantColor2 = useCallback(() => ggetDominantColor2(context), [
    context,
  ]);

  const getDominantColor3 = useCallback(() => ggetDominantColor3(context), [
    context,
  ]);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const response = await api.get<Movie>(`/movies/${match.params.id}`);
      setMovie(response.data);
    }

    loadMovie();
  }, [match.params.id]);

  useEffect(() => {
    function doTheThing(): void {
      if (!movie) {
        return;
      }

      const posterImage = new Image();
      posterImage.onload = () => {
        // eslint-disable-next-line no-unused-expressions
        context?.drawImage(posterImage, 0, 0);
        const c = getDominantColor();

        console.log(getLuminance(c));
        console.log(getLuminance(darken(0.3, c)));

        setColor(darken(0.0, c));
      };
      posterImage.src = movie.posterPath;
      posterImage.crossOrigin = 'Anonymous';
    }

    doTheThing();
  });

  return (
    <Container>
      <MovieBanner backgroundUrl={movie.backdropPath} color={color}>
        <MoviePoster>
          {/* Canvas no stack overflow */}
          {/* https://stackoverflow.com/questions/60424853/html-canvas-with-react-hooks-and-typescript */}
          <canvas ref={canvasRef} width="300" height="450" />
          <img ref={posterRef} src={movie?.posterPath} alt={movie?.title} />
        </MoviePoster>

        <MovieInfo>
          <h1>{movie?.title}</h1>
          <p className="tagline">{movie?.tagline}</p>
          <strong>Sinopse</strong>
          <section>{movie?.overview}</section>
          <p className="rating">
            <big>{movie?.voteAverage * 10}</big>
            <small> &#160;% </small>
            {/* <small> &#160;/ 100</small> */}
          </p>
        </MovieInfo>
      </MovieBanner>
    </Container>
  );
};

export default MovieDetails;
