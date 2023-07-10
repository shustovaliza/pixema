import { type QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import { type UpdateAccessTokenResponse } from './auth.api.types';
import { AUTH_API_URL, localStorageNames } from '../../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: AUTH_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(localStorageNames.accessToken);
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (argument, api, extraOptions) => {
  const refreshToken = localStorage.getItem(localStorageNames.refreshToken);
  let result = await baseQuery(argument, api, extraOptions);
  if (result.error && result.error.status === 401 && refreshToken) {
    const updateAccessTokenResult = (await baseQuery(
      {
        url: 'auth/jwt/refresh/',
        method: 'POST',
        body: { refresh: refreshToken }
      },
      api,
      extraOptions
    )) as QueryReturnValue<UpdateAccessTokenResponse>;

    if (updateAccessTokenResult.data) {
      localStorage.setItem(
        localStorageNames.accessToken,
        updateAccessTokenResult.data.access
      );
      result = await baseQuery(argument, api, extraOptions);
    } else {
      console.error(updateAccessTokenResult.error);
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});
