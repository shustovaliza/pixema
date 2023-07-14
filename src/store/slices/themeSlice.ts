import { createSlice } from '@reduxjs/toolkit';

import { localStorageNames } from '../constants';
import { type RootState } from '../store.types';

type ThemeState = {
  isLightTheme: boolean;
};

const getInitialState = (): ThemeState => {
  const theme = localStorage.getItem(localStorageNames.theme);

  return theme === 'dark' ? { isLightTheme: false } : { isLightTheme: true };
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialState,
  reducers: {
    changeTheme: (state) => {
      state.isLightTheme = !state.isLightTheme;
      localStorage.setItem(
        localStorageNames.theme,
        state.isLightTheme ? 'light' : 'dark'
      );
    }
  }
});

export const { actions: themeActions } = themeSlice;
export const selectTheme = (state: RootState) => state.theme.isLightTheme;
