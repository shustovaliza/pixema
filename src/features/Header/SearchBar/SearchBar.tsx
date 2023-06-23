import { ReactComponent as Filter } from '~/assets/icons/Filter.svg';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';

import searchBarStyles from './SearchBar.module.scss';

export const SearchBar = () => {
  return (
    <form
      className={searchBarStyles.container}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input placeholder="Search" />
      <Button
        icon={<Filter />}
        appearance={ButtonAppearance.IconButton}
      ></Button>
    </form>
  );
};
