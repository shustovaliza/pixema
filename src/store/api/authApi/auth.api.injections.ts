import { type User, type JWTToken } from '~/entities/user';

import { authApi } from './auth.api';
import {
  type CreateTokenPayload,
  type ActivateEmailPayload,
  type CreateUserPayload,
  type CreateUserResponse,
  type ResendEmailPayload,
  type ResetPasswordPayload,
  type ConfirmResetPasswordPayload
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
    }),
    resetPassword: build.mutation<void, ResetPasswordPayload>({
      query: (payload) => ({
        url: 'auth/users/reset_password/',
        method: 'POST',
        body: payload
      }),
      transformErrorResponse: (response) => response.data
    }),
    confirmResetPassword: build.mutation<void, ConfirmResetPasswordPayload>({
      query: (payload) => ({
        url: '/auth/users/reset_password_confirm/',
        method: 'POST',
        body: payload
      }),
      transformErrorResponse: (response) => response.data
    }),
    changeUsername: build.mutation<User, User['username']>({
      query: (payload) => ({
        url: 'auth/users/me/',
        method: 'PATCH',
        body: {
          username: payload
        }
      }),
      transformErrorResponse: (response) => response.data
    }),
    deleteUser: build.mutation<void, string>({
      query: (payload) => ({
        url: 'auth/users/me/',
        method: 'DELETE',
        body: {
          current_password: payload
        }
      }),
      transformErrorResponse: (response) => response.data
    })
  })
});

export const {
  useCreateUserMutation,
  useActivateEmailMutation,
  useResendActivationEmailMutation,
  useCreateTokensMutation,
  useFetchUserQuery,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
  useChangeUsernameMutation,
  useDeleteUserMutation
} = authApiInjections;
