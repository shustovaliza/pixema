import { useState } from 'react';

import { Logo } from '~/shared/ui/Logo/Logo';
import { selectUser } from '~/store/slices/authSlice';
import { useAppSelector } from '~/store/store.types';

import headerStyles from './Header.module.scss';
import { Menu } from './Menu/Menu';
import { MenuButton } from './Menu/MenuButton';
import { SearchBar } from './SearchBar/SearchBar';
import { UserPanel } from './UserPanel/UserPanel';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };

  return (
    <header className={headerStyles.container}>
      <Logo />
      <SearchBar />
      <UserPanel user={user} />
      <MenuButton
        onClick={toggleMenu}
        isOpen={isOpen}
      />
      <Menu isOpen={isOpen} />
    </header>
  );
};
