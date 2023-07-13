import { useCallback, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';
import { useConfirmResetPasswordMutation } from '~/store/api/authApi/auth.api.injections';

import { confirmResetPasswordFormSchema } from './ConfirmResetPasswordForm.schema';
import FormStyles from '../forms.module.scss';
import {
  type ConfirmResetPasswordErrorMessage,
  type FormState
} from '../forms.types';
import {
  getDefaultFormValues,
  getFormErrorsForConfirmResetPassword
} from '../forms.utils';

export const ConfirmResetPasswordForm = () => {
  const { uid, token } = useParams<'uid' | 'token'>();

  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );

  const [errorMessage, setErrorMessage] =
    useState<ConfirmResetPasswordErrorMessage | null>(null);

  const updateFormValues = useCallback((newFormValue: Partial<FormState>) => {
    setFormState((previousFields) => ({ ...previousFields, ...newFormValue }));
    setTouchedFields(
      (previousFields) =>
        new Set([...previousFields.values(), ...Object.keys(newFormValue)])
    );
  }, []);

  const formErrors = useMemo(
    () => getFormErrorsForConfirmResetPassword(formState),
    [formState]
  );

  const [confirmResetPassword, { isLoading }] =
    useConfirmResetPasswordMutation();

  const navigate = useNavigate();

  return (
    <form
      className={FormStyles.form}
      onSubmit={(event) => {
        event.preventDefault();
        confirmResetPassword({
          uid: uid,
          token: token,
          new_password: formState.confirmPassword
        })
          .unwrap()
          .then(() => navigate('/sign-in'))
          .catch((error: ConfirmResetPasswordErrorMessage) => {
            console.error(error);
            setErrorMessage(error);
          });
      }}
    >
      <h1>{'Новый пароль'}</h1>
      {errorMessage ? (
        <div className={FormStyles.errorMessage}>
          <p>{errorMessage.token}</p>
          <p>{errorMessage.new_password}</p>
        </div>
      ) : null}
      <div className={FormStyles.inputsWrap}>
        {confirmResetPasswordFormSchema.map((field) => (
          <InputField
            {...field}
            key={field.name}
            shouldFitContainer
            error={
              touchedFields.has(field.name) ? formErrors[field.name] : undefined
            }
            onChange={({ target: { value } }) =>
              updateFormValues({ [field.name]: value })
            }
          />
        ))}
      </div>
      <Button
        type="submit"
        appearance={ButtonAppearance.Primary}
        shouldFitContainer
        text={'Изменить пароль'}
        disabled={
          isLoading ||
          touchedFields.size === 0 ||
          Object.keys(formErrors).length > 0
        }
      />
    </form>
  );
};
