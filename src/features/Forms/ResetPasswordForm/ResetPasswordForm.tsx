import { useCallback, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { useResetPasswordMutation } from '~/store/api/authApi/auth.api.injections';

import FormStyles from '../forms.module.scss';
import { type SignUpErrorMessage, type FormState } from '../forms.types';
import { getErrorsForFormsWithOnlyEmailInput } from '../forms.utils';

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const formError = useMemo(
    () => getErrorsForFormsWithOnlyEmailInput(email),
    [email]
  );
  const [errorMessage, setErrorMessage] = useState<
    SignUpErrorMessage['email'] | null
  >(null);
  const updateEmailValue = useCallback((newEmailValue: FormState['email']) => {
    setEmail(newEmailValue);
    setIsDirty(true);
  }, []);

  const [resetPassword, { isLoading, status }] = useResetPasswordMutation();

  const navigate = useNavigate();

  if (status === 'fulfilled') {
    return (
      <div className={FormStyles.form}>
        <span>{`Вы получите электронное письмо на почту ${email} с ссылкой для сброса пароля!`}</span>
        <Button
          appearance={ButtonAppearance.Primary}
          text={'На главную'}
          onClick={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <form
      className={FormStyles.form}
      onSubmit={(event) => {
        event.preventDefault();
        resetPassword({ email: email })
          .unwrap()
          .then()
          .catch((error: SignUpErrorMessage['email']) => {
            console.error(error);
            setErrorMessage(error);
          });
      }}
    >
      <h1>Сбросить пароль</h1>
      {errorMessage ? (
        <div className={FormStyles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      ) : null}
      <InputField
        label="Email"
        shouldFitContainer
        placeholder={'Ваш email'}
        value={email}
        onChange={({ target: { value } }) => {
          updateEmailValue(value);
        }}
        error={isDirty ? formError : undefined}
      />
      <Button
        appearance={ButtonAppearance.Primary}
        shouldFitContainer
        text={'Сбросить'}
        type="submit"
        disabled={isLoading || isDirty === false || formError !== undefined}
      />
    </form>
  );
};
