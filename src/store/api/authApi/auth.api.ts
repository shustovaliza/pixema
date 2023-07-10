import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTH_API_URL, localStorageNames } from '../../constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API_URL,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem(localStorageNames.accessToken);
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
    }
  }),
  endpoints: () => ({})
});
