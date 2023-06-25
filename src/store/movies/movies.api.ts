import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type Movie } from '~/entities/movie';

import { BASE_API_URL, getAccessToken } from '../constants';

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
  perPage: number;
  page: number;
  order?: string;
  type?: string;
  genre?: string;
  released?: string;
  runtime?: string;
  score?: string;
  language?: string;
  certification?: string;
  country?: string;
  onlyStreamable?: boolean;
  includeAdult?: boolean;
}

axios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Unauthorized');
  }
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});

export const MOVIES_PER_PAGE = 10;

export const fetchMovies = createAsyncThunk(
  'fetch/movies',
  async (payload: FetchMoviesPayload, thunkAPI) => {
    const { data } = await axios.get<FetchMoviesResponse>(
      `${BASE_API_URL}titles`,
      {
        params: payload,
        signal: thunkAPI.signal
      }
    );
    return data;
  }
);
