import { NavLink } from 'react-router-dom';

import { Navlinks } from '~/features/Header/Menu/Menu.constants';

import menuStyles from './Menu.module.scss';

export const Menu = ({ isOpen }: { isOpen: boolean }) => {
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
          >
            {link.img}
            {link.title}
          </NavLink>
        ))}
      </nav>
      <p>© All Rights Reserved</p>
    </div>
  );
};
