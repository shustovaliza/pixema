import { NavLink } from 'react-router-dom';

import { Navlinks } from '~/features/Header/Menu/Menu.constants';

import menuStyles from './Menu.module.scss';

export const Menu = () => {
  return (
    <div className={menuStyles.container}>
      <nav className={menuStyles.linksWrap}>
        {Navlinks().map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
          >
            {link.img}
            {link.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
