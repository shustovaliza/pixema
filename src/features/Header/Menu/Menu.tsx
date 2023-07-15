import { NavLink } from 'react-router-dom';

import { Navlinks } from '~/features/Header/Menu/Menu.constants';
import { moviesApi } from '~/store/api/moviesApi/movies.api';
import { useAppDispatch } from '~/store/store.types';

import menuStyles from './Menu.module.scss';

export const Menu = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={menuStyles.container}
      data-open={isOpen}
    >
      <nav className={menuStyles.linksWrap}>
        {Navlinks().map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => dispatch(moviesApi.util.resetApiState())}
          >
            {link.img}
            {link.title}
          </NavLink>
        ))}
      </nav>
      <p>© Все права защищены</p>
    </div>
  );
};
