import { SignInForm } from '~/features/SignInForm/SignInForm';
import { Logo } from '~/shared/ui/Logo/Logo';

import SignInPageStyles from './SignIn.module.scss';

export const SignInPage = () => {
  return (
    <div className={SignInPageStyles.container}>
      <header>
        <div className={SignInPageStyles.logo}>
          <Logo />
        </div>
      </header>
      <main className={SignInPageStyles.signInFormWrap}>
        <SignInForm></SignInForm>
      </main>
      <footer>
        <span>{'© Все права защищены'}</span>
      </footer>
    </div>
  );
};
