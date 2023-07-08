import { Form } from '~/shared/ui/Form/Form';

import { signInFormSchema } from './SignInForm.schema';

export const SignInPage = () => {
  return (
    <Form
      header={'Войти'}
      formSchema={signInFormSchema}
      resetPasswordLink={'/reset-password'}
      resetPasswordLinkText={'Забыли пароль?'}
      buttonText={'Войти'}
      textBeforeLink={'У вас нет аккаунта? '}
      link={'/sign-up'}
      linkText={'Зарегистрируйтесь'}
    />
  );
};
