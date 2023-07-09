import { type FormErrors, type FormState } from './forms.types';

export function getDefaultFormValues(): FormState {
  return {
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  };
}

const MIN_NAME_LENGTH = 3;

function isValidName(name: FormState['username']): boolean {
  return name.trim().length >= MIN_NAME_LENGTH;
}

function isValidEmail(email: FormState['email']): boolean {
  return /^[\w-.+]+@(?<domain>[\w-]+\.)+[\w-]{2,4}$/.test(email);
}

const MIN_PASSWORD_LENGTH = 4;

function isValidPassword(password: FormState['password']): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function getFormErrorsForSignUp(formValues: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!isValidName(formValues.username)) {
    errors.username = 'Имя пользователя должно содержать больше трех символов';
  }

  if (!isValidEmail(formValues.email)) {
    errors.email = 'Пример email: test@mail.ru';
  }

  if (!isValidPassword(formValues.password)) {
    errors.password = 'Пароль должен содержать больше четырех символов';
  }

  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'Пароль не совпадает';
  }

  return errors;
}

export function getFormErrorsForSignIn(formValues: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!isValidEmail(formValues.email)) {
    errors.email = 'Пример email: test@mail.ru';
  }

  if (!isValidPassword(formValues.password)) {
    errors.password = 'Пароль должен содержать больше четырех символов';
  }

  return errors;
}

export function getFormErrorsForResendActivationEmailForm(
  email: FormState['email']
): FormErrors['email'] {
  let error: FormErrors['email'];

  if (!isValidEmail(email)) {
    error = 'Пример email: test@mail.ru';
  }

  return error;
}
