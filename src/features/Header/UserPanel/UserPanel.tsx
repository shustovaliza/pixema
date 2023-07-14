import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowDown } from '~/assets/icons/ArrowDown.svg';
import { ReactComponent as ArrowRight } from '~/assets/icons/ArrowRight.svg';
import { ReactComponent as UserIcon } from '~/assets/icons/user.svg';
import { type User } from '~/entities/user';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { authApi } from '~/store/api/authApi/auth.api';
import { userActions } from '~/store/slices/authSlice';
import { useAppDispatch } from '~/store/store.types';

import usernameStyles from './UserPanel.module.scss';

function getInitials(name: User['username']) {
  return name.slice(0, 1);
}

const UserActionsPanel = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      className={usernameStyles.userActionsContainer}
      data-open={isOpen}
    >
      <Button
        appearance={ButtonAppearance.Secondary}
        text={'Редактировать'}
        onClick={() => navigate('/settings')}
      />
      <Button
        appearance={ButtonAppearance.Secondary}
        text={'Выйти'}
        onClick={() => {
          dispatch(userActions.logout());
          dispatch(authApi.util.resetApiState());
        }}
      />
    </div>
  );
};

export const UserPanel = ({ user }: { user?: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleActionsPanel = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };

  const navigate = useNavigate();
  return user ? (
    <div>
      <div
        className={usernameStyles.container}
        onClick={toggleActionsPanel}
      >
        <div className={usernameStyles.initials}>
          {getInitials(user.username)}
        </div>
        <div className={usernameStyles.name}>{`${user.username}`}</div>
        <Button
          appearance={ButtonAppearance.IconButton}
          icon={<ArrowDown />}
        />
      </div>
      <UserActionsPanel isOpen={isOpen} />
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
