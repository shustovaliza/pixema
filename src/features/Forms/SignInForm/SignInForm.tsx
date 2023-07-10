import { useState, useCallback, useMemo } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { useCreateTokensMutation } from '~/store/api/authApi/auth.api.injections';

import { signInFormSchema } from './SignInForm.schema';
import FormStyles from '../forms.module.scss';
import { type SignInErrorMessage, type FormState } from '../forms.types';
import { getFormErrorsForSignIn, getDefaultFormValues } from '../forms.utils';

export const SignInForm = () => {
  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );
  const [errorMessage, setErrorMessage] = useState<SignInErrorMessage | null>(
    null
  );

  const updateFormValues = useCallback((newFormValue: Partial<FormState>) => {
    setFormState((previousFields) => ({ ...previousFields, ...newFormValue }));
    setTouchedFields(
      (previousFields) =>
        new Set([...previousFields.values(), ...Object.keys(newFormValue)])
    );
  }, []);

  const formErrors = useMemo(
    () => getFormErrorsForSignIn(formState),
    [formState]
  );

  const [createTokens, { isLoading }] = useCreateTokensMutation();

  const navigate = useNavigate();

  return (
    <form
      className={FormStyles.form}
      onSubmit={(event) => {
        event.preventDefault();
        createTokens({ email: formState.email, password: formState.password })
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch((error: SignInErrorMessage) => {
            console.error(error);
            setErrorMessage(error);
          });
      }}
    >
      <h1>{'Войти'}</h1>
      {errorMessage ? (
        <div className={FormStyles.errorMessage}>
          <p>{errorMessage.detail}</p>
        </div>
      ) : null}
      <div className={FormStyles.inputsWrap}>
        {signInFormSchema.map((field) => (
          <InputField
            {...field}
            key={field.name}
            value={formState[field.name]}
            error={
              touchedFields.has(field.name) ? formErrors[field.name] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ [field.name]: value })
            }
            shouldFitContainer
          ></InputField>
        ))}
        <Link to={'/reset-password'}>{'Забыли пароль?'}</Link>
      </div>
      <Button
        appearance={ButtonAppearance.Primary}
        type="submit"
        shouldFitContainer
        text={'Войти'}
        disabled={
          isLoading ||
          touchedFields.size === 0 ||
          Object.keys(formErrors).length > 0
        }
      ></Button>
      <span className={FormStyles.link}>
        {'У вас нет аккаунта? '}
        <Link to={'/sign-up'}>{'Зарегистрируйтесь'}</Link>
      </span>
    </form>
  );
};
