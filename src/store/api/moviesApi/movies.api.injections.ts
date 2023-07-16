import { type FoundMovie } from '~/entities/foundMovie';
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
  page?: string;
  limit?: string;
  genres?: string;
  favoriteMoviesId?: string[];
}

interface SearchMoviesResponse {
  docs: FoundMovie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface SearchMoviesPayload {
  query?: string;
  limit?: string;
}

export const moviesApiInjections = moviesApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getMovies: build.query<FetchMoviesResponse, FetchMoviesPayload>({
      query: ({
        page,
        limit,
        genres,
        favoriteMoviesId
      }: FetchMoviesPayload) => {
        const parameters = new URLSearchParams();

        if (page) {
          parameters.append('page', page);
        }

        if (limit) {
          parameters.append('limit', limit);
        }

        if (genres) {
          parameters.append('genres.name', genres);
        }

        if (favoriteMoviesId) {
          for (const id of favoriteMoviesId) {
            parameters.append('id', id);
          }
        }

        return {
          url: `v1.3/movie`,
          params: parameters
        };
      },
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
    }),
    searchMovies: build.query<SearchMoviesResponse, SearchMoviesPayload>({
      query: ({ query, limit }: { query?: string; limit?: string }) => {
        const parameters = new URLSearchParams();

        if (query) {
          parameters.append('query', query);
        }

        if (limit) {
          parameters.append('limit', limit);
        }

        return {
          url: `/v1.2/movie/search`,
          params: parameters
        };
      }
    })
  })
});

export const { useGetMoviesQuery, useGetMovieQuery, useSearchMoviesQuery } =
  moviesApiInjections;
