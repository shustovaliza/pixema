export const MOVIES_API_URL = import.meta.env.VITE_MOVIES_API_URL as string;
export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL as string;

export const getAccessToken = () => {
  return 'ZYSDF6P-RR1M2M0-NPCSTNE-XRB3CDR';
};

export const localStorageNames = {
  accessToken: '@pixema/access-token',
  refreshToken: '@pixema/refresh-token',
  theme: '@pixema/theme',
  favoriteMovies: '@pixema/favorite-movies'
} as const;
