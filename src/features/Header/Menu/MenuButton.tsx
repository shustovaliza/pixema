import { ReactComponent as CloseIcon } from '~/assets/icons/Close.svg';
import { ReactComponent as BurgerIcon } from '~/assets/icons/Menu.svg';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';

import menuStyles from './Menu.module.scss';
export const MenuButton = ({
  isOpen,
  onClick
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      className={menuStyles.menuButton}
      appearance={ButtonAppearance.Primary}
      onClick={onClick}
      icon={isOpen ? <CloseIcon /> : <BurgerIcon />}
    />
  );
};
