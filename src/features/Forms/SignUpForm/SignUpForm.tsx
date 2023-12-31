import { useState, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { useCreateUserMutation } from '~/store/api/authApi/auth.api.injections';
import { type CreateUserResponse } from '~/store/api/authApi/auth.api.types';

import { signUpFormSchema } from './SignUpForm.schema';
import FormStyles from '../forms.module.scss';
import { type SignUpErrorMessage, type FormState } from '../forms.types';
import { getDefaultFormValues, getFormErrorsForSignUp } from '../forms.utils';

export const SignUpForm = ({
  onCreateUser
}: {
  onCreateUser: (user: CreateUserResponse) => void;
}) => {
  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );
  const [errorMessage, setErrorMessage] = useState<SignUpErrorMessage | null>(
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
    () => getFormErrorsForSignUp(formState),
    [formState]
  );

  const [createUser, { isLoading }] = useCreateUserMutation();

  return (
    <form
      className={FormStyles.form}
      onSubmit={(event) => {
        event.preventDefault();

        const { ...user } = formState;
        createUser(user)
          .unwrap()
          .then((data) => {
            onCreateUser(data);
          })
          .catch((error: SignUpErrorMessage) => {
            console.error(error);
            setErrorMessage(error);
          });
      }}
    >
      <h1>{'Регистрация'}</h1>
      {errorMessage ? (
        <div className={FormStyles.errorMessage}>
          {Object.values(errorMessage).map((error) => {
            return <p key={error[0]}>{error}</p>;
          })}
        </div>
      ) : null}
      <div className={FormStyles.inputsWrap}>
        {signUpFormSchema.map((field) => (
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
      </div>
      <Button
        appearance={ButtonAppearance.Primary}
        type="submit"
        shouldFitContainer
        text={'Регистрация'}
        disabled={
          isLoading ||
          touchedFields.size === 0 ||
          Object.keys(formErrors).length > 0
        }
      ></Button>
      <span className={FormStyles.link}>
        {'У вас уже есть аккаунт? '}
        <Link to={'/sign-in'}>{'Войти'}</Link>
      </span>
    </form>
  );
};
