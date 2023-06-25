import { configureStore } from '@reduxjs/toolkit';

import { moviesSlice } from './movies/movies.slice';

export const store = configureStore({
  reducer: {
    [moviesSlice.name]: moviesSlice.reducer
  }
});
