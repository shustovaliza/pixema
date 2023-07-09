import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import FormStyles from '~/features/Forms/forms.module.scss';
import { ResendActivationEmailForm } from '~/features/Forms/ResendActivationEmailForm/ResendActivationEmailForm';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { useActivateEmailMutation } from '~/store/api/authApi/auth.api.injections';
import { type ActivateEmailPayload } from '~/store/api/authApi/auth.api.types';

export const EmailConfirmationPage = () => {
  const tokens = useParams<'uid' | 'token'>();
  const [activateEmail, { status }] = useActivateEmailMutation();
  const navigate = useNavigate();

  useEffect(() => {
    activateEmail(tokens as ActivateEmailPayload)
      .unwrap()
      .then()
      .catch((error) => console.error(error));
  }, [tokens, activateEmail]);

  if (status === 'rejected') {
    return <ResendActivationEmailForm />;
  }

  if (status === 'pending') {
    return (
      <div className={FormStyles.form}>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  return (
    <div className={FormStyles.form}>
      <h1>Регистрация завершена</h1>
      <span>Теперь вы можете войти в свой аккаунт</span>
      <Button
        appearance={ButtonAppearance.Primary}
        shouldFitContainer
        text={'Войти'}
        onClick={() => navigate('/sign-in')}
      />
    </div>
  );
};
