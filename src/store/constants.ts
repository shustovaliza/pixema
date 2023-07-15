export const MOVIES_API_URL = import.meta.env.VITE_MOVIES_API_URL as string;
export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL as string;

export const getAccessToken = () => {
  return '9FTFJRS-1564J9Q-P20M8JZ-5DK60RA';
};

export const localStorageNames = {
  accessToken: '@pixema/access-token',
  refreshToken: '@pixema/refresh-token',
  theme: '@pixema/theme',
  favoriteMovies: '@pixema/favorite-movies'
} as const;
