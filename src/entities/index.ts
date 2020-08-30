export interface Actor {
  id: number;
  character: string;
  name: string;
  profilePath: string;
}

export interface SimpleMovie {
  id: number;
  title: string;
}

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  tagline?: string;
  posterPath: string;
  backdropPath?: string;
  voteAverage: number;
  runtime: number;
  genres: string[];
  cast: Actor[];
}
