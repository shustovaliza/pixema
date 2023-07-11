import { createSlice } from '@reduxjs/toolkit';

import { type JWTToken, type User } from '~/entities/user';

import { authApiInjections } from '../api/authApi/auth.api.injections';
import { localStorageNames } from '../constants';
import { type RootState } from '../store.types';

type AuthState = {
  user: User | undefined;
  tokens: JWTToken | null;
};

const getInitialState = (): AuthState => {
  const accessToken = localStorage.getItem(localStorageNames.accessToken);
  const refreshToken = localStorage.getItem(localStorageNames.refreshToken);

  return {
    user: undefined,
    tokens:
      accessToken && refreshToken
        ? { access: accessToken, refresh: refreshToken }
        : null
  };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem(localStorageNames.accessToken);
      localStorage.removeItem(localStorageNames.refreshToken);
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiInjections.endpoints.createTokens.matchFulfilled,
      (state, { payload }) => {
        state.tokens = { access: payload.access, refresh: payload.refresh };
        localStorage.setItem(localStorageNames.accessToken, payload.access);
        localStorage.setItem(localStorageNames.refreshToken, payload.refresh);
      }
    );
    builder.addMatcher(
      authApiInjections.endpoints.fetchUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  }
});

export const selectTokens = (state: RootState) => state.auth.tokens;
export const selectUser = (state: RootState) => state.auth.user;
export const { actions: userActions } = authSlice;
