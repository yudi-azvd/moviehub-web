import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';

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
  const [movie, setMovie] = useState<Movie>({
    voteAverage: 0,
  } as Movie);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const posterRef = useRef<HTMLImageElement>(null);

  const context = useMemo(() => canvasRef.current?.getContext('2d'), []);

  const getDominantColor = useCallback((): string => {
    const width = 300;
    const height = 450;
    const imageData = context?.getImageData(0, 0, width, height);

    console.log('imageData', context);
    console.log('imageData', imageData);

    if (!imageData) {
      return '#555';
    }

    let red = 0;
    let green = 0;
    let blue = 0;

    for (let i = 0; i < imageData?.data.length; i += 40) {
      red += imageData?.data[i];
      green += imageData?.data[i + 1];
      blue += imageData?.data[i + 2];
      console.log('hey');
    }

    const total = width * height;
    const meanRed = red / total;
    const meanGreen = green / total;
    const meanBlue = blue / total;

    const color = `rgb(${meanRed}, ${meanGreen}, ${meanBlue})`;

    console.log('color', color);

    return color;
  }, [context]);

  const color = useMemo(() => getDominantColor(), [getDominantColor]);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      const response = await api.get<Movie>(`/movies/${match.params.id}`);
      setMovie(response.data);

      console.log('draw image', getDominantColor());
    }

    loadMovie();
  }, [match.params.id]);

  useEffect(() => {
    function doTheThing(): void {
      if (!movie) {
        return;
      }

      const posterImage = new Image();
      posterImage.src = movie.posterPath;
      // eslint-disable-next-line no-unused-expressions
      context?.drawImage(posterImage, 0, 0);
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
