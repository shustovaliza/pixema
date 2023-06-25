import { createSlice } from '@reduxjs/toolkit';

import { type Movie } from '~/entities/movie';

import { fetchMovies } from './movies.api';

const getInitialState = (): {
  state: 'idle' | 'loading' | 'error' | 'success';
  movies: Movie[];
  error: string;
  count: number;
} => {
  return {
    state: 'idle',
    movies: [],
    error: '',
    count: 0
  };
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: getInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.state = 'loading';
      state.error = '';
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.state = 'success';
      state.movies = action.payload.pagination.data;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        return;
      }

      state.state = 'error';
      state.error = 'Ooops';
    });
  }
});

export const { actions: moviesActions } = moviesSlice;
