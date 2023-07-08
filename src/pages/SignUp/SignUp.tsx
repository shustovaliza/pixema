import { Form } from '~/shared/ui/Form/Form';

import { signUpFormSchema } from './SignUpForm.schema';

export const SignUpPage = () => {
  return (
    <Form
      header={'Регистрация'}
      formSchema={signUpFormSchema}
      buttonText={'Регистрация'}
      textBeforeLink={'У вас уже есть аккаунт? '}
      link={'/sign-in'}
      linkText={'Войти'}
    />
  );
};
