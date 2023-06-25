import { type RootState } from '~/store/store.types';

export const selectMovies = (state: RootState) => state.movies.movies;
