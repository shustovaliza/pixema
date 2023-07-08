import { Outlet } from 'react-router-dom';

import { Logo } from '~/shared/ui/Logo/Logo';

import AuthLayoutStyles from './AuthLayout.module.scss';

export const AuthLayout = () => {
  return (
    <div className={AuthLayoutStyles.container}>
      <header>
        <div className={AuthLayoutStyles.logo}>
          <Logo />
        </div>
      </header>
      <main className={AuthLayoutStyles.formWrap}>
        <Outlet />
      </main>
      <footer>
        <span>{'© Все права защищены'}</span>
      </footer>
    </div>
  );
};
