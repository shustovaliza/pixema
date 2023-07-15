import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi/auth.api';
import { moviesApi } from './api/moviesApi/movies.api';
import { authSlice } from './slices/authSlice';
import { moviesSlice } from './slices/moviesSlice';
import { themeSlice } from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [moviesSlice.name]: moviesSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(moviesApi.middleware, authApi.middleware),
  devTools: import.meta.env.DEV
});
