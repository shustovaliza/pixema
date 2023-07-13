import { useCallback, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { useResendActivationEmailMutation } from '~/store/api/authApi/auth.api.injections';

import FormStyles from '../forms.module.scss';
import { type FormState } from '../forms.types';
import { getErrorsForFormsWithOnlyEmailInput } from '../forms.utils';

export const ResendActivationEmailForm = () => {
  const [email, setEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const formError = useMemo(
    () => getErrorsForFormsWithOnlyEmailInput(email),
    [email]
  );

  const updateEmailValue = useCallback((newEmailValue: FormState['email']) => {
    setEmail(newEmailValue);
    setIsDirty(true);
  }, []);

  const [resendActivationEmail, { status }] =
    useResendActivationEmailMutation();

  const navigate = useNavigate();

  if (status === 'rejected') {
    return (
      <div className={FormStyles.form}>
        <h1>Упс! Что-то пошло не так!</h1>
        <span>Советуем вам попробовать зарегистрироваться еще раз</span>
        <Button
          appearance={ButtonAppearance.Primary}
          shouldFitContainer
          text={'На страницу регистрации'}
          onClick={() => {
            navigate('/sign-up');
          }}
        />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className={FormStyles.form}>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (status === 'fulfilled') {
    return (
      <div className={FormStyles.form}>
        <h1>Подтверждение регистрации</h1>
        <span>{`На вашу почту отправлено письмо с ссылкой для активации аккаунта`}</span>
        <Button
          appearance={ButtonAppearance.Primary}
          text={'На главную'}
          shouldFitContainer
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
        resendActivationEmail({ email: email })
          .unwrap()
          .then()
          .catch((error) => console.error(error));
      }}
    >
      <h1>Упс! Что-то пошло не так!</h1>
      <span>
        Мы можем отправить письмо с ссылкой для активации аккаунта еще раз
      </span>
      <InputField
        label="Email"
        error={isDirty ? formError : undefined}
        shouldFitContainer
        value={email}
        placeholder={'Ваш email'}
        onChange={({ target: { value } }) => {
          updateEmailValue(value);
        }}
      />
      <Button
        appearance={ButtonAppearance.Primary}
        shouldFitContainer
        text={'Отправить'}
        disabled={isDirty === false || formError !== undefined}
        type="submit"
      />
    </form>
  );
};
