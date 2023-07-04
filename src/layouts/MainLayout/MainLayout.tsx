import { Outlet } from 'react-router-dom';

import { Header } from '~/features/Header/Header';

import layoutStyles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={layoutStyles.container}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
