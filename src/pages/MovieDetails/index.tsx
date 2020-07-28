import React, { useEffect, useState, useRef, useCallback } from 'react';

import api from '../../services/api';

import { Container, MovieBanner, MoviePoster, MovieInfo } from './styles';

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

  /**
   * Ideias para otimização:
   * 1. pegar apenas um pixel no meio da imagem
   * 2. pular em mútiplos de quatro (i+=4, i+=8, i++40...)
   */
  const getDominantColor = useCallback((): string => {
    // referência
    // https://www.w3schools.com/tags/canvas_getimagedata.asp
    const width = 300;
    const height = 450;
    const imageData = context?.getImageData(0, 0, width, height);

    if (!imageData) {
      return '#555555';
    }

    let red = 0;
    let green = 0;
    let blue = 0;

    for (let i = 0; i < imageData.data.length; i += 400) {
      red += imageData.data[i];
      green += imageData.data[i + 1];
      blue += imageData.data[i + 2];
    }

    const total = ((width * height) / 400) * 4;
    const meanRed = Math.floor(red / total);
    const meanGreen = Math.floor(green / total);
    const meanBlue = Math.floor(blue / total);

    const rgb = `rgb(${meanRed}, ${meanGreen}, ${meanBlue})`;

    return rgb;
  }, [context]);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const response = await api.get<Movie>(`/movies/${match.params.id}`);
      setMovie(response.data);
    }

    loadMovie();
  }, [match.params.id, getDominantColor]);

  useEffect(() => {
    function doTheThing(): void {
      if (!movie) {
        return;
      }

      const posterImage = new Image();
      posterImage.onload = () => {
        // eslint-disable-next-line no-unused-expressions
        context?.drawImage(posterImage, 0, 0);
        setColor(getDominantColor());
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
          <canvas ref={canvasRef} width="300" height="450" />
          <img ref={posterRef} src={movie?.posterPath} alt={movie?.title} />
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
