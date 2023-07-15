import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type Movie } from '~/entities/movie';

import { localStorageNames } from '../constants';

const getInitialState = (): { favoriteMovies: Movie['id'][] } => {
  const savedFavoriteMovies = localStorage.getItem(
    localStorageNames.favoriteMovies
  );

  return savedFavoriteMovies
    ? (JSON.parse(savedFavoriteMovies) as { favoriteMovies: Movie['id'][] })
    : { favoriteMovies: [] };
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: getInitialState,
  reducers: {
    addMovieToFavorites: (state, action: PayloadAction<Movie['id']>) => {
      state.favoriteMovies = state.favoriteMovies.includes(action.payload)
        ? state.favoriteMovies.filter((item) => item !== action.payload)
        : [...state.favoriteMovies, action.payload];
      localStorage.setItem(
        localStorageNames.favoriteMovies,
        JSON.stringify({ favoriteMovies: state.favoriteMovies })
      );
    }
  }
});

export const { actions: moviesActions } = moviesSlice;
