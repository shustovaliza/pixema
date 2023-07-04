import { type Movie } from '~/entities/movie';

import { baseApi } from '..';

interface FetchMoviesResponse {
  status: string;
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    last_page: number;
    total: number;
    data: Movie[];
  };
}

interface FetchMoviesPayload {
  perPage?: number;
  page?: number;
  order?: string;
  type?: string;
  genre?: string;
  released?: string;
  runtime?: string;
  score?: string;
  language?: string;
  certification?: string;
  country?: string;
  /* eslint-disable-next-line @typescript-eslint/naming-convention -- The server needs this name */
  onlyStreamable?: boolean;
  /* eslint-disable-next-line @typescript-eslint/naming-convention -- The server needs this name */
  includeAdult?: boolean;
}

export const moviesApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getMovies: build.query<FetchMoviesResponse, FetchMoviesPayload>({
      query: (payload: FetchMoviesPayload) => ({
        url: `titles`,
        params: payload
      })
    }),
    getMovie: build.query<Movie, { id: string }>({
      query: ({ id }) => ({
        url: `titles/${id}`
      })
    })
  })
});

export const { useGetMoviesQuery, useGetMovieQuery } = moviesApi;
