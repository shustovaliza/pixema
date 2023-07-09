import { useState, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';

import { signInFormSchema } from './SignInForm.schema';
import FormStyles from '../forms.module.scss';
import { type FormState } from '../forms.types';
import { getFormErrorsForSignIn, getDefaultFormValues } from '../forms.utils';

export const SignInForm = () => {
  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
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

  return (
    <form
      className={FormStyles.form}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h1>{'Войти'}</h1>
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
          touchedFields.size === 0 || Object.keys(formErrors).length > 0
        }
      ></Button>
      <span className={FormStyles.link}>
        {'У вас нет аккаунта? '}
        <Link to={'/sign-up'}>{'Зарегистрируйтесь'}</Link>
      </span>
    </form>
  );
};
