export const MOVIES_API_URL = import.meta.env.VITE_MOVIES_API_URL as string;
export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL as string;

export const getAccessToken = () => {
  return '9B1ZQQ8-6ZFMB27-HHZMKZ1-5Z0S3H5';
};

export const localStorageNames = {
  accessToken: '@pixema/access-token',
  refreshToken: '@pixema/refresh-token',
  theme: '@pixema/theme'
} as const;
