import { useNavigate } from 'react-router-dom';

import { ChangeUsernameForm } from '~/features/Settings/ChangeUsernameForm';
import { DeleteUserForm } from '~/features/Settings/DeleteUserForm';
import { ThemeSwitcher } from '~/features/Settings/ThemeSwitcher';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { selectUser } from '~/store/slices/authSlice';
import { useAppSelector } from '~/store/store.types';

import settingsPageStyles from './Settings.module.scss';

export const SettingsPage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return user ? (
    <div className={settingsPageStyles.container}>
      <div className={settingsPageStyles.dataWrap}>
        <h2>Профиль</h2>
        <div className={settingsPageStyles.data}>
          <div className={settingsPageStyles.inputWrap}>
            <span>Имя пользователя</span>
            <div className={settingsPageStyles.input}>{user.username}</div>
          </div>
          <div className={settingsPageStyles.inputWrap}>
            <span>Email</span>
            <div className={settingsPageStyles.input}>{user.email}</div>
          </div>
        </div>
      </div>
      <ChangeUsernameForm />
      <div className={settingsPageStyles.dataWrap}>
        <h2>Изменить пароль</h2>
        <div className={settingsPageStyles.data}>
          <Button
            appearance={ButtonAppearance.Primary}
            text={'Изменить пароль'}
            shouldFitContainer
            onClick={() => navigate('/reset-password')}
          />
        </div>
      </div>
      <DeleteUserForm />
      <ThemeSwitcher />
    </div>
  ) : (
    <ThemeSwitcher />
  );
};
