import { useState, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '~/shared/ui/Button/Button';
import { ButtonAppearance } from '~/shared/ui/Button/Button.types';
import { InputField } from '~/shared/ui/InputField/InputField';

import FormStyles from './Form.module.scss';
import { type FormField, type FormState } from './form.types';
import { getDefaultFormValues, getFormErrors } from './form.utils';

export const Form = ({
  formSchema,
  header,
  buttonText,
  textBeforeLink,
  link,
  linkText,
  resetPasswordLink,
  resetPasswordLinkText
}: {
  formSchema: FormField[];
  header: string;
  buttonText: string;
  textBeforeLink: string;
  link: string;
  linkText: string;
  resetPasswordLink?: string;
  resetPasswordLinkText?: string;
}) => {
  const [formState, setFormState] = useState<FormState>(getDefaultFormValues);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValues = useCallback((newFormValue: Partial<FormState>) => {
    setFormState((previousFields) => ({ ...previousFields, ...newFormValue }));
    setTouchedFields(
      (previousFields) =>
        new Set([...previousFields.values(), ...Object.keys(newFormValue)])
    );
  }, []);

  const formErrors = useMemo(() => getFormErrors(formState), [formState]);

  return (
    <form className={FormStyles.form}>
      <h1>{`${header}`}</h1>
      <div className={FormStyles.inputsWrap}>
        {formSchema.map((field) => (
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
        {resetPasswordLink && resetPasswordLinkText ? (
          <Link to={`${resetPasswordLink}`}>{`${resetPasswordLinkText}`}</Link>
        ) : null}
      </div>
      <Button
        appearance={ButtonAppearance.Primary}
        type="submit"
        shouldFitContainer
        text={`${buttonText}`}
        disabled={
          isLoading ||
          touchedFields.size === 0 ||
          Object.keys(formErrors).length > 0
        }
      ></Button>
      <span className={FormStyles.link}>
        {`${textBeforeLink}`}
        <Link to={`${link}`}>{`${linkText}`}</Link>
      </span>
    </form>
  );
};
