import { authApi } from './auth.api';

export interface CreateUserResponse {
  username: string;
  email: string;
  id: number;
}

export interface CreateUserPayload {
  username: string;
  password: string;
  email: string;
}
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
    })
  })
});

export const { useCreateUserMutation } = authApiInjections;
