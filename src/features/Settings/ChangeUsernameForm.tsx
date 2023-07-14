import { useState } from 'react';

import { type SignUpErrorMessage } from '~/features/Forms/forms.types';
import settingsPageStyles from '~/pages/Settings/Settings.module.scss';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { useChangeUsernameMutation } from '~/store/api/authApi/auth.api.injections';

export const ChangeUsernameForm = () => {
  const [username, setUsername] = useState('');

  const [errorMessage, setErrorMessage] = useState<
    SignUpErrorMessage['username'] | null
  >(null);

  const [isDirty, setIsDirty] = useState(false);

  const [changeUsername, { isLoading, status }] = useChangeUsernameMutation();

  return (
    <div className={settingsPageStyles.dataWrap}>
      <h2>Изменить имя пользователя</h2>
      <form
        className={settingsPageStyles.data}
        style={{ flexDirection: 'column', gap: '20px' }}
        onSubmit={(event) => {
          event.preventDefault();
          changeUsername(username)
            .unwrap()
            .then(() => {
              setErrorMessage(null);
            })
            .catch((error: SignUpErrorMessage['username']) => {
              console.error(error);
              setErrorMessage(error);
            });
        }}
      >
        {errorMessage ? (
          <p style={{ color: '#ff5154' }}>{Object.values(errorMessage)}</p>
        ) : null}
        {status === 'fulfilled' ? (
          <p style={{ color: '#00a340' }}>
            {'Имя пользователя успешно изменено'}
          </p>
        ) : null}
        <InputField
          label="Новое имя пользователя"
          shouldFitContainer
          placeholder="Новое имя пользователя"
          value={username}
          name="username"
          onChange={({ target: { value } }) => {
            setUsername(value);
            setIsDirty(true);
          }}
        />
        <Button
          appearance={ButtonAppearance.Primary}
          type="submit"
          text={'Изменить имя пользователя'}
          shouldFitContainer
          disabled={isDirty === false || isLoading}
        />
      </form>
    </div>
  );
};
