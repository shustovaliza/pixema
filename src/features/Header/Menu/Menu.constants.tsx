import { type ReactElement } from 'react';

import { ReactComponent as FavoritesIcon } from '~/assets/icons/Favorites.svg';
import { ReactComponent as HomeIcon } from '~/assets/icons/Home.svg';
import { ReactComponent as SettingsIcon } from '~/assets/icons/Setting.svg';
import { ReactComponent as TrendsIcon } from '~/assets/icons/Trends.svg';

interface Navlink {
  path: string;
  title: string;
  img: ReactElement;
}

export const Navlinks = (): Navlink[] => {
  return [
    {
      path: '/',
      title: 'Home',
      img: <HomeIcon />
    },
    {
      path: '/trends',
      title: 'Trends',
      img: <TrendsIcon />
    },
    {
      path: '/favorites',
      title: 'Favorites',
      img: <FavoritesIcon />
    },
    {
      path: '/settings',
      title: 'Settings',
      img: <SettingsIcon />
    }
  ];
};
