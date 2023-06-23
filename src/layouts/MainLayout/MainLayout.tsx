import { Outlet } from 'react-router-dom';

import { Header } from '~/features/Header/Header';
import { Menu } from '~/features/Menu/Menu';

import layoutStyles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={layoutStyles.container}>
      <Header />
      <div className={layoutStyles.contentAndMenuWrap}>
        <Menu />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
