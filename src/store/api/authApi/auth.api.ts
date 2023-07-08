import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTH_API_URL } from '../../constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API_URL
  }),
  endpoints: () => ({})
});
