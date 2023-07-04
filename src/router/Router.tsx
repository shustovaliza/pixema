import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from '~/layouts/MainLayout/MainLayout';
import { MainPage } from '~/pages/Main/Main';
import { MoviePage } from '~/pages/Movie/MoviePage';

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
    path: '*',
    element: <div>Not found</div>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={routerSchema} />;
};
