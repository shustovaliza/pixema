import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';

import SignInFormStyles from './SignInForm.module.scss';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className={SignInFormStyles.form}>
      <h1>Войти</h1>
      <div className={SignInFormStyles.inputsWrap}>
        <InputField
          label="Email"
          type="email"
          placeholder="Ваш email"
          id="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          shouldFitContainer
        ></InputField>
        <InputField
          label="Пароль"
          type="password"
          placeholder="Ваш пароль"
          id="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          shouldFitContainer
        ></InputField>
        <Link to={'/reset-password'}>{'Забыли пароль?'}</Link>
      </div>
      <Button
        appearance={ButtonAppearance.Primary}
        type="submit"
        shouldFitContainer
        text={'Войти'}
      />
      <span className={SignInFormStyles.signUpLink}>
        {'У вас нет аккаунта? '}
        <Link to={'/sign-up'}>{'Зарегистрируйтесь'}</Link>
      </span>
    </form>
  );
};
