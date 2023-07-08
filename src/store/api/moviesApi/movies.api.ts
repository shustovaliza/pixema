import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken, MOVIES_API_URL } from '../../constants';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIES_API_URL,
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('X-API-KEY', `${accessToken}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});
