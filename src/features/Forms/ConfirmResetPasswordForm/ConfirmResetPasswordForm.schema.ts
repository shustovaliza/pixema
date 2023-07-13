import { type FormField } from '../forms.types';

export const confirmResetPasswordFormSchema: FormField[] = [
  {
    label: 'Пароль',
    placeholder: 'Ваш пароль',
    name: 'password',
    type: 'password',
    required: true
  },
  {
    label: 'Подтвердите пароль',
    placeholder: 'Подтвердите пароль',
    name: 'confirmPassword',
    type: 'password',
    required: true
  }
];
