import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as Logo } from '~/assets/icons/pixema.svg';

import headerStyles from './Header.module.scss';
import { MenuButton } from './Menu/MenuButton';
import { SearchBar } from './SearchBar/SearchBar';
import { UserPanel } from './UserPanel/UserPanel';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };

  const navigate = useNavigate();

  return (
    <header className={headerStyles.container}>
      <div
        className={headerStyles.logoWrap}
        onClick={() => navigate('/')}
      >
        <Logo />
      </div>
      <SearchBar />
      <UserPanel />
      <MenuButton
        onClick={toggleMenu}
        isOpen={isOpen}
      />
    </header>
  );
};
