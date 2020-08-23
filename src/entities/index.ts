export interface Actor {
  id: number;
  character: string;
  name: string;
  profilePath: string;
}

export interface Movie {
  id: string;
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
