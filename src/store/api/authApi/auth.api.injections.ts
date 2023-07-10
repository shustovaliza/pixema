import { type User, type JWTToken } from '~/entities/user';

import { authApi } from './auth.api';
import {
  type CreateTokenPayload,
  type ActivateEmailPayload,
  type CreateUserPayload,
  type CreateUserResponse,
  type ResendEmailPayload
} from './auth.api.types';

export const authApiInjections = authApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    createUser: build.mutation<CreateUserResponse, CreateUserPayload>({
      query: (payload) => ({
        url: 'auth/users/',
        method: 'POST',
        body: payload
      }),
      transformErrorResponse: (response) => response.data
    }),
    activateEmail: build.mutation<void, ActivateEmailPayload>({
      query: (payload) => ({
        url: 'auth/users/activation/',
        method: 'POST',
        body: payload
      })
    }),
    resendActivationEmail: build.mutation<
      ResendEmailPayload,
      ResendEmailPayload
    >({
      query: (payload) => ({
        url: 'auth/users/resend_activation/',
        method: 'POST',
        body: payload
      })
    }),
    createTokens: build.mutation<JWTToken, CreateTokenPayload>({
      query: (payload) => ({
        url: 'auth/jwt/create/',
        method: 'POST',
        body: payload
      }),
      transformErrorResponse: (response) => response.data
    }),
    fetchUser: build.query<User, null>({
      query: () => ({
        url: 'auth/users/me/'
      })
    })
  })
});

export const {
  useCreateUserMutation,
  useActivateEmailMutation,
  useResendActivationEmailMutation,
  useCreateTokensMutation,
  useFetchUserQuery
} = authApiInjections;
