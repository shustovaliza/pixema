import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi/auth.api';
import { moviesApi } from './api/moviesApi/movies.api';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(moviesApi.middleware, authApi.middleware),
  devTools: import.meta.env.DEV
});
