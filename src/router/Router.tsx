import { useEffect } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout } from '~/layouts/AuthLayout/AuthLayout';
import { MainLayout } from '~/layouts/MainLayout/MainLayout';
import { BestMoviesPage } from '~/pages/BestMovies/BestMovies';
import { ConfirmResetPasswordPage } from '~/pages/ConfirmResetPassword/ConfirmResetPassword';
import { EmailConfirmationPage } from '~/pages/EmailConfirmation/EmailConfirmation';
import { FavoritesPage } from '~/pages/Favorites/Favorites';
import { MainPage } from '~/pages/Main/Main';
import { MoviePage } from '~/pages/Movie/MoviePage';
import { ResetPasswordPage } from '~/pages/ResetPassword/ResetPassword';
import { SearchPage } from '~/pages/Search/Search';
import { SettingsPage } from '~/pages/Settings/Settings';
import { SignInPage } from '~/pages/SignIn/SignIn';
import { SignUpPage } from '~/pages/SignUp/SignUp';
import { authApiInjections } from '~/store/api/authApi/auth.api.injections';
import { selectTokens } from '~/store/slices/authSlice';
import { selectTheme } from '~/store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '~/store/store.types';

const routerSchema = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      { index: true, Component: MainPage },
      {
        path: '/movie/:id',
        Component: MoviePage
      },
      { path: '/settings', Component: SettingsPage },
      { path: '/favorites', Component: FavoritesPage },
      { path: '/search', Component: SearchPage },
      { path: '/best-movies', Component: BestMoviesPage }
    ]
  },
  {
    Component: AuthLayout,
    children: [
      { path: '/sign-in', Component: SignInPage },
      { path: '/sign-up', Component: SignUpPage },
      { path: '/activate/:uid/:token', Component: EmailConfirmationPage },
      { path: '/reset-password', Component: ResetPasswordPage },
      {
        path: '/password/reset/confirm/:uid/:token',
        Component: ConfirmResetPasswordPage
      }
    ]
  },
  {
    path: '*',
    element: <div>Not found</div>
  }
]);

export const AppRouter = () => {
  const tokens = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();
  const isLightTheme = useAppSelector(selectTheme);

  useEffect(() => {
    document
      .querySelector(':root')
      ?.classList[isLightTheme ? 'add' : 'remove']('light');
  }, [isLightTheme]);

  useEffect(() => {
    if (tokens) {
      const promise = dispatch(
        authApiInjections.endpoints.fetchUser.initiate(null)
      );

      return () => {
        promise.abort();
      };
    }
  }, [tokens, dispatch]);

  return <RouterProvider router={routerSchema} />;
};
