import { ReactComponent as Logo } from '~/assets/icons/pixema.svg';

import headerStyles from './Header.module.scss';
import { SearchBar } from './SearchBar/SearchBar';
import { UserPanel } from './UserPanel/UserPanel';

export const Header = () => {
  return (
    <header className={headerStyles.container}>
      <div className={headerStyles.logoWrap}>
        <Logo />
      </div>
      <SearchBar />
      <UserPanel />
    </header>
  );
};
