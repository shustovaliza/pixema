import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowDown } from '~/assets/icons/ArrowDown.svg';
import { ReactComponent as ArrowRight } from '~/assets/icons/ArrowRight.svg';
import { ReactComponent as UserIcon } from '~/assets/icons/user.svg';
import { type User } from '~/entities/user';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';

import usernameStyles from './UserPanel.module.scss';

function getInitials(name: User['username']) {
  const [firstname = '', lastname = ''] = name.split(' ');

  return `${firstname.slice(0, 1)}${lastname.slice(0, 1)}`;
}

export const UserPanel = ({ user }: { user?: User }) => {
  const navigate = useNavigate();
  return user ? (
    <div className={usernameStyles.container}>
      <div className={usernameStyles.initials}>
        {getInitials(user.username)}
      </div>
      <div className={usernameStyles.name}>{`${user.username}`}</div>
      <Button
        appearance={ButtonAppearance.IconButton}
        icon={<ArrowDown />}
      />
    </div>
  ) : (
    <div
      className={usernameStyles.container}
      onClick={() => navigate('/sign-in')}
    >
      <div className={usernameStyles.initials}>{<UserIcon />}</div>
      <div className={usernameStyles.name}>{'Войти'}</div>
      <Button
        appearance={ButtonAppearance.IconButton}
        icon={<ArrowRight />}
      />
    </div>
  );
};
