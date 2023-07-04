export interface Movie {
  id: number;
  name: string;
  release_date: string;
  year: string;
  tagline: string;
  poster: string;
  backdrop: string;
  runtime: number;
  budget: number;
  revenue: number;
  popularity: number;
  tmdb_id: number;
  imdb_id: string;
  /* eslint-disable-next-line @typescript-eslint/naming-convention -- The data comes from the server, I can't change the name */
  is_series: boolean;
  /* eslint-disable-next-line @typescript-eslint/naming-convention -- The data comes from the server, I can't change the name */
  adult: boolean;
  season_count: number;
  episode_count: number;
  /* eslint-disable-next-line @typescript-eslint/naming-convention -- The data comes from the server, I can't change the name */
  series_ended: boolean;
  language: string;
  original_title: string;
  certification: string;
  rating: string;
  vote_count: number;
}
