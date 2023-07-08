import { type Movie } from '~/entities/movie';

import { moviesApi as moviesApi } from './movies.api';

interface FetchMoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface FetchMoviesPayload {
  page?: number;
  limit?: number;
  year?: number;
}

export const moviesApiInjections = moviesApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getMovies: build.query<FetchMoviesResponse, FetchMoviesPayload>({
      query: (payload: FetchMoviesPayload) => ({
        url: `v1.3/movie`,
        params: payload
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.docs.push(...newItems.docs);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0
    }),
    getMovie: build.query<Movie, { id: string }>({
      query: ({ id }) => ({
        url: `v1.3/movie/${id}`
      })
    })
  })
});

export const { useGetMoviesQuery, useGetMovieQuery } = moviesApiInjections;
