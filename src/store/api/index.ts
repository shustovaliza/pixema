import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken, BASE_API_URL } from '../constants';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});
