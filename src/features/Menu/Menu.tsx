import { NavLink } from 'react-router-dom';

import { Navlinks } from '~/features/Menu/Menu.constants';

import menuStyles from './Menu.module.scss';

export const Menu = () => {
  return (
    <aside className={menuStyles.container}>
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
      <p>© All Rights Reserved</p>
    </aside>
  );
};
