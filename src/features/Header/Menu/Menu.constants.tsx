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
      title: 'Главная',
      img: <HomeIcon />
    },
    {
      path: '/trends',
      title: 'Тренды',
      img: <TrendsIcon />
    },
    {
      path: '/favorites',
      title: 'Избранное',
      img: <FavoritesIcon />
    },
    {
      path: '/settings',
      title: 'Настройки',
      img: <SettingsIcon />
    }
  ];
};
