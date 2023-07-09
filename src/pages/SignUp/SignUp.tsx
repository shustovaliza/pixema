import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SignUpForm } from '~/features/Forms/SignUpForm/SignUpForm';
import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { type CreateUserResponse } from '~/store/api/authApi/auth.api.injections';

import signUpStyles from './SignUp.module.scss';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [createdUser, setCreatedUser] = useState<CreateUserResponse | null>(
    null
  );
  return createdUser ? (
    <div className={signUpStyles.container}>
      <h1>Подтверждение регистрации</h1>
      <span>{`На вашу почту ${createdUser.email} отправлено письмо с ссылкой для активации аккаунта`}</span>
      <Button
        appearance={ButtonAppearance.Primary}
        text={'На главную'}
        shouldFitContainer
        onClick={() => navigate('/')}
      />
    </div>
  ) : (
    <SignUpForm onCreateUser={(newUser) => setCreatedUser(newUser)} />
  );
};
