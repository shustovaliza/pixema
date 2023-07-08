import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout } from '~/layouts/AuthLayout/AuthLayout';
import { MainLayout } from '~/layouts/MainLayout/MainLayout';
import { MainPage } from '~/pages/Main/Main';
import { MoviePage } from '~/pages/Movie/MoviePage';
import { SignInPage } from '~/pages/SignIn/SignIn';

const routerSchema = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      { index: true, Component: MainPage },
      {
        path: 'movie/:id',
        Component: MoviePage
      }
    ]
  },
  {
    Component: AuthLayout,
    children: [{ path: '/sign-in', Component: SignInPage }]
  },
  {
    path: '*',
    element: <div>Not found</div>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={routerSchema} />;
};
