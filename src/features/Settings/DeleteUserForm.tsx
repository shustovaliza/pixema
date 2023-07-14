import { useState } from 'react';

import settingsPageStyles from '~/pages/Settings/Settings.module.scss';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { authApi } from '~/store/api/authApi/auth.api';
import { useDeleteUserMutation } from '~/store/api/authApi/auth.api.injections';
import { useAppDispatch } from '~/store/store.types';

export const DeleteUserForm = () => {
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  const [isDirty, setIsDirty] = useState(false);

  const dispatch = useAppDispatch();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  return (
    <div className={settingsPageStyles.dataWrap}>
      <h2>Удалить аккаунт</h2>
      <form
        className={settingsPageStyles.data}
        style={{ flexDirection: 'column', gap: '20px' }}
        onSubmit={(event) => {
          event.preventDefault();
          deleteUser(password)
            .unwrap()
            .then(() => {
              dispatch(authApi.util.resetApiState());
            })
            .catch((error: string[]) => {
              console.error(error);
              setErrorMessage(error);
            });
        }}
      >
        {errorMessage ? (
          <p style={{ color: '#ff5154' }}>{Object.values(errorMessage)}</p>
        ) : null}

        <InputField
          label="Введите пароль"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={({ target: { value } }) => {
            setPassword(value);
            setIsDirty(true);
          }}
        ></InputField>
        <Button
          className={settingsPageStyles.deleteUserButton}
          appearance={ButtonAppearance.Primary}
          text={'Удалить аккаунт'}
          shouldFitContainer
          type="submit"
          disabled={isDirty === false || isLoading}
        />
      </form>
    </div>
  );
};
